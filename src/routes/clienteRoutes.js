// src/routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Cria novo cliente
router.post('/', clienteController.createCliente);

// Lista todos os clientes
router.get('/', clienteController.getAllClientes);

// Busca cliente por ID
router.get('/:id', clienteController.getClienteById);

// Atualiza cliente
router.put('/:id', clienteController.updateCliente);

// Deleta cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
