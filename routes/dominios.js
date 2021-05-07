const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// REFERÊNCIA O CONTROLLER
const DominiosController = require('../controllers/dominios-controller');

// RETORNA TODOS OS DOMINIOS DE UM SERVIDOR
router.get('/:id', auth, DominiosController.getAllDominios);

// INSERE NOVO DOMINIO
router.post('/', auth, DominiosController.postDominio);

// RETORNA DADOS DE UM DOMINIO
router.get('/:id/:id', auth, DominiosController.getIdDominio);

// ALTERA DADOS DE UM DOMINIO
// router.patch('/:id', DominiosController.patchCliente);

//DELETA UM DOMINIO
router.delete('/:id/:id', auth, DominiosController.deleteDominio);

module.exports = router;