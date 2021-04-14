const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const auth = require('../middleware/auth');


// REFERÊNCIA O CONTROLLER
const ClientesController = require('../controllers/clientes-controller');


// RETORNA TODOS OS CLIENTES
router.get('/', auth, ClientesController.getAllClientes);

// INSERE UM CLIENTE
router.post('/', auth, ClientesController.postCliente);

// RETORNA DADOS DE UM CLIENTE
router.get('/:id', auth, ClientesController.getIdCliente);

// ALTERA DADOS DE UM CLIENTE
router.patch('/:id', auth, ClientesController.patchCliente);

//DELETA UM CLIENTE
router.delete('/:id', auth, ClientesController.deleteCliente);

module.exports = router;