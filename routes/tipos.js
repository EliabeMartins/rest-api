const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const auth = require('../middleware/auth');

// REFERÊNCIA O CONTROLLER
const TiposController = require('../controllers/tipos-controller');

// RETORNA TODOS OS TIPOS DE SERVIDORES
router.get('/', auth, TiposController.getAllTipos);


module.exports = router;