// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Cria novo ticket
router.post('/', ticketController.createTicket);

// Lista todos os tickets
router.get('/', ticketController.getAllTickets);

// Busca ticket por ID
router.get('/:id', ticketController.getTicketById);

// Atualiza ticket
router.put('/:id', ticketController.updateTicket);

// Deleta ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
