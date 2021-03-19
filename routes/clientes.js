const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


// REFERÊNCIA O CONTROLLER
const ClientesController = require('../controllers/clientes-controller');


// RETORNA TODOS OS CLIENTES
router.get('/', ClientesController.getClientes);

// INSERE UM CLIENTE
router.put('/', ClientesController.putCliente);

// RETORNA DADOS DE UM CLIENTE
router.get('/:id', ClientesController.getId_Cliente);

// ALTERA DADOS DE UM CLIENTE
router.patch('/', ClientesController.patchCliente);

//DELETA UM CLIENTE
router.delete('/', ClientesController.deleteCliente);

module.exports = router;