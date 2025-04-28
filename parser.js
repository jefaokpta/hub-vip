// parser.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const mysql = require('mysql2/promise');

const pastaCDRs = '/opt/cdrs/incoming';
const pastaProcessados = '/opt/cdrs/processed';

const dbConfig = {
  host: 'db',
  user: 'cdr_reader',
  password: 'V0zInteligente@2025',
  database: 'hub_vip'
};

async function extrairOperadoras(registroChamada, connection) {
  let operadoraOrigem = null;
  let operadoraDestino = null;

  try {
    const regexA = /A:([0-9]{20})/; // Capturando 20 caracteres aqui e na linha de baixo
    const regexB = /B:([0-9]{20})/;

    const matchA = registroChamada.match(regexA);
    const matchB = registroChamada.match(regexB);

    if (matchA) {
      const codigoA = matchA[1].slice(15, 20);
      const [rowsA] = await connection.execute(
        'SELECT nome FROM operadoras WHERE codigo = ? LIMIT 1',
        [codigoA]
      );
      if (rowsA.length > 0) operadoraOrigem = rowsA[0].nome;
    }

    if (matchB) {
      const codigoB = matchB[1].slice(15, 20);
      const [rowsB] = await connection.execute(
        'SELECT nome FROM operadoras WHERE codigo = ? LIMIT 1',
        [codigoB]
      );
      if (rowsB.length > 0) operadoraDestino = rowsB[0].nome;
    }
  } catch (err) {
    console.error('[ERRO] Falha ao extrair operadoras:', err.message);
  }

  return { operadoraOrigem, operadoraDestino };
}

async function processFile(filePath, connection) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const campos = line.split(';');

    try {
      const dataInicio = campos[12] ? new Date(campos[12]) : null;
      const dataFim = campos[14] ? new Date(campos[14]) : null;
      const duracaoSegundos = (dataInicio && dataFim)
       ? Math.floor((dataFim - dataInicio) / 1000)
       : null;
      const registroChamada = campos[52];
      const { operadoraOrigem, operadoraDestino } = await extrairOperadoras(registroChamada, connection);

      const registro = {
        id_chamada: campos[0],
        data_tentativa: campos[10] || null,
        data_inicio: campos[12] || null,
        data_fim: campos[14] || null,
        numero_origem: campos[21] || null,
        numero_destino: campos[24] || null,
        ip_origem: campos[26]?.split(':')[0] || null,
        ip_destino: campos[27]?.split(':')[0] || null,
        ip_externo_origem: campos[42]?.split(':')[0] || null,
        registro_chamada: registroChamada,
        operadora_origem: operadoraOrigem,
        operadora_destino: operadoraDestino,
        duracao_segundos: duracaoSegundos,
        raw_cdr: line      
      };

      const camposSQL = Object.keys(registro).join(', ');
      const valores = Object.values(registro,registroChamada, operadoraOrigem, operadoraDestino);
      const placeholders = valores.map(() => '?').join(', ');
      await connection.execute(
        `INSERT INTO trafego (${camposSQL}) VALUES (${placeholders})`,
        valores
      );
    } catch (err) {
      console.error('[ERRO]', err.message);
    }
  }
}

async function main() {
  const connection = await mysql.createConnection(dbConfig);

  const arquivos = fs.readdirSync(pastaCDRs).filter(f => f.endsWith('.cdr'));

  for (const arquivo of arquivos) {
    const filePath = path.join(pastaCDRs, arquivo);

    const [rows] = await connection.execute(
      'SELECT COUNT(*) AS total FROM cdr_processados WHERE nome_arquivo = ?',
      [arquivo]
    );

    if (rows[0].total > 0) {
      console.log(`[INFO] Arquivo ignorado (já processado): ${arquivo}`);
      continue;
    }

    console.log(`[INFO] Processando arquivo: ${arquivo}`);
    await processFile(filePath, connection);

    await connection.execute(
      'INSERT INTO cdr_processados (nome_arquivo) VALUES (?)',
      [arquivo]
    );

    fs.renameSync(filePath, path.join(pastaProcessados, arquivo));
  }

  await connection.end();
}

main().catch(err => console.error('[FATAL]', err));
