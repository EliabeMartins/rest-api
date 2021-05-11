const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');


// REFERÊNCIA O CONTROLLER
const IpsController = require('../controllers/ips-controller');

// RETORNA TODOS OS IPS DE UM SERVIDOR
router.get('/server/:id', IpsController.getServIps);

// INSERE NOVOS IPS NO SERVIDOR
router.post('/server', IpsController.postServIps);

// RETORNA DADOS DE UM IP DO SERVER
router.get('/server/:id/:id', IpsController.getIdServ);

// ALTERA IPS DE UM SERVIDOR
router.patch('/server/:id/:id', IpsController.patchIpServ);

//DELETA IPS DE UM SERVIDOR
router.delete('/server/:id/:id', IpsController.delIpServ);



// RETORNA TODOS OS IPS DE UM DOMINIO
router.get('/dom/:id', IpsController.getDomIps);

// INSERE NOVOS IPS NO DOMINIO
router.post('/dom', IpsController.postDomIps);

// RETORNA DADOS DE UM IP DO DOMINIO
router.get('/dom/:id/:id', IpsController.getIdDom);

// ALTERA IPS DE UM DOMINIO
router.patch('/dom/:id/:id', IpsController.patchIpDom);

//DELETA UM DOMINIO
router.delete('/dom/:id/:id', IpsController.delIpDom);


module.exports = router;