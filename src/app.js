// src/app.js
require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parse do JSON
app.use(express.json());

// Importa as rotas
const clienteRoutes = require('./routes/clienteRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const faturamentoRoutes = require('./routes/faturamentoRoutes');
const trafegoRoutes = require('./routes/trafegoRoutes');

// Define as rotas base
app.use('/api/clientes', clienteRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/faturamento', faturamentoRoutes);
app.use('/api/trafego', trafegoRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
