const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
// const auth = require('../middleware/auth');


// REFERÊNCIA AS CONTROLLER
const ServersController = require('../controllers/servers-controller');


// RETORNA TODOS OS SERVIDORES
router.get('/', ServersController.getServers);

// INSERE UM SERVIDOR
router.put('/', ServersController.putServers);

// RETORNA DADOS DE UM SERVIDOR
router.get('/:id', ServersController.getIdServer);

// ALTERA UM SERVIDOR
router.patch('/', ServersController.patchServer);

//DELETA UM SERVIDOR
router.delete('/', ServersController.deleteServer);

module.exports = router;