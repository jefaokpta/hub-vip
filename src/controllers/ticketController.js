// src/controllers/ticketController.js
const db = require('../config/database');

// Cria um novo ticket
exports.createTicket = (req, res) => {
  const {
    id,
    cliente_id,
    nome_empresa,
    telefone,
    email,
    solicitante,
    descricao,
    area_responsavel,
    prioridade,
    status,
    estagio,
    data_abertura,
    data_atualizacao
  } = req.body;

  // Validação dos campos obrigatórios
  if (!id || !cliente_id) {
    return res.status(400).json({ error: 'ID do ticket e ID do cliente são obrigatórios.' });
  }

  const sql = `INSERT INTO tickets (id, cliente_id, nome_empresa, telefone, email, solicitante, descricao, area_responsavel, prioridade, status, estagio, data_abertura, data_atualizacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [id, cliente_id, nome_empresa, telefone, email, solicitante, descricao, area_responsavel, prioridade, status, estagio, data_abertura, data_atualizacao];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir ticket:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    return res.status(201).json({ message: 'Ticket criado com sucesso!', result });
  });
};

// Lista todos os tickets
exports.getAllTickets = (req, res) => {
  const sql = 'SELECT * FROM tickets';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar tickets:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    res.json(results);
  });
};

// Busca ticket por ID
exports.getTicketById = (req, res) => {
  const sql = 'SELECT * FROM tickets WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar ticket:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Ticket não encontrado' });
    }
    res.json(results[0]);
  });
};

// Atualiza um ticket
exports.updateTicket = (req, res) => {
  const { id } = req.params;
  const {
    cliente_id,
    nome_empresa,
    telefone,
    email,
    solicitante,
    descricao,
    area_responsavel,
    prioridade,
    status,
    estagio,
    data_abertura,
    data_atualizacao
  } = req.body;

  const sql = `UPDATE tickets SET cliente_id = ?, nome_empresa = ?, telefone = ?, email = ?, solicitante = ?, descricao = ?, area_responsavel = ?, prioridade = ?, status = ?, estagio = ?, data_abertura = ?, data_atualizacao = ? WHERE id = ?`;
  const values = [cliente_id, nome_empresa, telefone, email, solicitante, descricao, area_responsavel, prioridade, status, estagio, data_abertura, data_atualizacao, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar ticket:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ticket não encontrado' });
    }
    res.json({ message: 'Ticket atualizado com sucesso!' });
  });
};

// Deleta um ticket
exports.deleteTicket = (req, res) => {
  const sql = 'DELETE FROM tickets WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar ticket:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ticket não encontrado' });
    }
    res.json({ message: 'Ticket deletado com sucesso!' });
  });
};
