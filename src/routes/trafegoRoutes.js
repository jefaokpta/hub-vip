// src/routes/trafegoRoutes.js
const express = require('express');
const router = express.Router();
const trafegoController = require('../controllers/trafegoController');

// Lista todos os tickets
router.get('/', trafegoController.getAllTrafegos);

module.exports = router;