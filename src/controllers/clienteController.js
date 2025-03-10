// src/controllers/clienteController.js
const db = require('../config/database');

// Cria um novo cliente
exports.createCliente = (req, res) => {
  const {
    id,
    nome,
    cnpj,
    pessoa_contato,
    telefone,
    email,
    vendedor,
    franquia,
    tipo_franquia,
    numeros_contratados,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    codigo_omie,
    data_cadastro,
    data_alteracao
  } = req.body;

  // Validação dos campos obrigatórios
  if (!id || !nome) {
    return res.status(400).json({ error: 'ID e nome do cliente são obrigatórios.' });
  }

  const sql = `INSERT INTO clientes (id, nome, cnpj, pessoa_contato, telefone, email, vendedor, franquia, tipo_franquia, numeros_contratados, cep, endereco, numero, complemento, bairro, cidade, estado, codigo_omie, data_cadastro, data_alteracao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [id, nome, cnpj, pessoa_contato, telefone, email, vendedor, franquia, tipo_franquia, numeros_contratados, cep, endereco, numero, complemento, bairro, cidade, estado, codigo_omie, data_cadastro, data_alteracao];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    return res.status(201).json({ message: 'Cliente criado com sucesso!', result });
  });
};

// Lista todos os clientes
exports.getAllClientes = (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    res.json(results);
  });
};

// Busca um cliente por ID
exports.getClienteById = (req, res) => {
  const sql = 'SELECT * FROM clientes WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(results[0]);
  });
};

// Atualiza um cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const {
    nome,
    cnpj,
    pessoa_contato,
    telefone,
    email,
    vendedor,
    franquia,
    tipo_franquia,
    numeros_contratados,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    codigo_omie,
    data_cadastro,
    data_alteracao
  } = req.body;

  const sql = `UPDATE clientes SET nome = ?, cnpj = ?, pessoa_contato = ?, telefone = ?, email = ?, vendedor = ?, franquia = ?, tipo_franquia = ?, numeros_contratados = ?, cep = ?, endereco = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, codigo_omie = ?, data_cadastro = ?, data_alteracao = ? WHERE id = ?`;
  const values = [nome, cnpj, pessoa_contato, telefone, email, vendedor, franquia, tipo_franquia, numeros_contratados, cep, endereco, numero, complemento, bairro, cidade, estado, codigo_omie, data_cadastro, data_alteracao, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente atualizado com sucesso!' });
  });
};

// Deleta um cliente
exports.deleteCliente = (req, res) => {
  const sql = 'DELETE FROM clientes WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente deletado com sucesso!' });
  });
};
