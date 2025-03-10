// src/app.js
require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Middleware para parse do JSON
app.use(express.json());

// Importa as rotas
const clienteRoutes = require('./routes/clienteRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const faturamentoRoutes = require('./routes/faturamentoRoutes');

// Define as rotas base
app.use('/clientes', clienteRoutes);
app.use('/tickets', ticketRoutes);
app.use('/faturamento', faturamentoRoutes);

//teste de get
app.get('/teste', (req, res) => {
  res.json({ message: 'teste de get' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
