const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');


// REFERÊNCIA O CONTROLLER
const DominiosController = require('../controllers/dominios-controller');

// RETORNA TODOS OS DOMINIOS DE UM SERVIDOR
router.get('/:id', DominiosController.getAllDominios);

// INSERE NOVO DOMINIO
router.post('/', DominiosController.postDominio);

// RETORNA DADOS DE UM DOMINIO
router.get('/:id/:id', DominiosController.getIdDominio);

// ALTERA DADOS DE UM DOMINIO
// router.patch('/:id', DominiosController.patchCliente);

//DELETA UM DOMINIO
router.delete('/:id/:id', DominiosController.deleteDominio);

module.exports = router;