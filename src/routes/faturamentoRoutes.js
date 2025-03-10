// src/routes/faturamentoRoutes.js
const express = require('express');
const router = express.Router();
const faturamentoController = require('../controllers/faturamentoController');

// Cria novo registro de faturamento
router.post('/', faturamentoController.createFaturamento);

// Lista todos os registros de faturamento
router.get('/', faturamentoController.getAllFaturamento);

// Busca registro de faturamento por ID do cliente
router.get('/:cliente_id', faturamentoController.getFaturamentoByClienteId);

// Atualiza registro de faturamento
router.put('/:cliente_id', faturamentoController.updateFaturamento);

// Deleta registro de faturamento
router.delete('/:cliente_id', faturamentoController.deleteFaturamento);

module.exports = router;
