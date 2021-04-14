const express = require('express');
const router = express.Router();
// const mysql = require('../mysql').pool;
// const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

// REFERÊNCIA AS CONTROLLER
const UsersController = require('../controllers/users-controller');


// RETORNA TODOS OS USUÁRIOS
router.get('/', auth, UsersController.getUsers);

// INSERE UM USUÁRIO
router.post('/', UsersController.postUser);

// RETORNA DADOS DE UM USUÁRIO
router.get('/:id', auth, UsersController.getIdUser);

//ALTERA UM USUÁRIO
router.patch('/:id', auth, UsersController.patch_User);

//DELETA UM USUÁRIO
router.delete('/:id', UsersController.deleteUser);

module.exports = router;