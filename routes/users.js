const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');


// REFERÊNCIA AS CONTROLLER
const UsersController = require('../controllers/users-controller');


// RETORNA TODOS OS USUÁRIOS
router.get('/', UsersController.getUsers);

// INSERE UM USUÁRIO
router.post('/', UsersController.postUser);

// RETORNA DADOS DE UM USUÁRIO
router.get('/:id', UsersController.getIdUser);

//ALTERA UM USUÁRIO
router.patch('/:id', UsersController.patch_User);

//DELETA UM USUÁRIO
router.delete('/:id', UsersController.delete_User);

module.exports = router;