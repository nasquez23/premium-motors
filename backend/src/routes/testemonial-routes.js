const { Router } = require('express');

const testemonialsController = require('../controllers/testemonials-controller');

const router = Router();

router.get('/', testemonialsController.getTestemonials);

router.post('/', testemonialsController.addTestemonial);

router.get('/:uid', testemonialsController.getTestemonialsByUserId);

router.patch('/:tid', testemonialsController.updateTestemonial);

router.delete('/:tid', testemonialsController.deleteTestemonial);

module.exports = router;