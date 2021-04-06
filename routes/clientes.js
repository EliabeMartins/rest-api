const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


// REFERÊNCIA O CONTROLLER
const ClientesController = require('../controllers/clientes-controller');


// RETORNA TODOS OS CLIENTES
router.get('/', ClientesController.getAllClientes);

// INSERE UM CLIENTE
router.post('/', ClientesController.postCliente);

// RETORNA DADOS DE UM CLIENTE
router.get('/:id', ClientesController.getIdCliente);

// ALTERA DADOS DE UM CLIENTE
router.patch('/:id', ClientesController.patchCliente);

//DELETA UM CLIENTE
router.delete('/:id', ClientesController.deleteCliente);

module.exports = router;