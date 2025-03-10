// src/controllers/faturamentoController.js
const db = require('../config/database');

// Cria um novo registro de faturamento
exports.createFaturamento = (req, res) => {
  const {
    cliente_id,
    ultimo_fechamento,
    valor_pendente,
    minutos_franquia,
    minutos_excedentes,
    periodo_atual,
    historico_faturamento,
    plano_contratado,
    locacoes,
    data_expiracao
  } = req.body;

  if (!cliente_id) {
    return res.status(400).json({ error: 'ID do cliente é obrigatório.' });
  }

  const sql = `INSERT INTO faturamento (cliente_id, ultimo_fechamento, valor_pendente, minutos_franquia, minutos_excedentes, periodo_atual, historico_faturamento, plano_contratado, locacoes, data_expiracao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [cliente_id, ultimo_fechamento, valor_pendente, minutos_franquia, minutos_excedentes, periodo_atual, historico_faturamento, plano_contratado, locacoes, data_expiracao];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir registro de faturamento:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    return res.status(201).json({ message: 'Registro de faturamento criado com sucesso!', result });
  });
};

// Lista todos os registros de faturamento
exports.getAllFaturamento = (req, res) => {
  const sql = 'SELECT * FROM faturamento';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar faturamento:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    res.json(results);
  });
};

// Busca registro de faturamento por ID do cliente
exports.getFaturamentoByClienteId = (req, res) => {
  const sql = 'SELECT * FROM faturamento WHERE cliente_id = ?';
  db.query(sql, [req.params.cliente_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar faturamento:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Registro de faturamento não encontrado' });
    }
    res.json(results[0]);
  });
};

// Atualiza registro de faturamento
exports.updateFaturamento = (req, res) => {
  const { cliente_id } = req.params;
  const {
    ultimo_fechamento,
    valor_pendente,
    minutos_franquia,
    minutos_excedentes,
    periodo_atual,
    historico_faturamento,
    plano_contratado,
    locacoes,
    data_expiracao
  } = req.body;

  const sql = `UPDATE faturamento SET ultimo_fechamento = ?, valor_pendente = ?, minutos_franquia = ?, minutos_excedentes = ?, periodo_atual = ?, historico_faturamento = ?, plano_contratado = ?, locacoes = ?, data_expiracao = ? WHERE cliente_id = ?`;
  const values = [ultimo_fechamento, valor_pendente, minutos_franquia, minutos_excedentes, periodo_atual, historico_faturamento, plano_contratado, locacoes, data_expiracao, cliente_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar faturamento:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro de faturamento não encontrado' });
    }
    res.json({ message: 'Registro de faturamento atualizado com sucesso!' });
  });
};

// Deleta registro de faturamento
exports.deleteFaturamento = (req, res) => {
  const sql = 'DELETE FROM faturamento WHERE cliente_id = ?';
  db.query(sql, [req.params.cliente_id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar faturamento:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro de faturamento não encontrado' });
    }
    res.json({ message: 'Registro de faturamento deletado com sucesso!' });
  });
};
