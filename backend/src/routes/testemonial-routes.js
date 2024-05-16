const { Router } = require('express');

const testemonialsController = require('../controllers/testemonials-controller');

const checkAuthorization = require('../middleware/check-auth');

const router = Router();

router.get('/', testemonialsController.getTestemonials);

router.get('/:uid', testemonialsController.getTestemonialsByUserId);

router.use(checkAuthorization);

router.post('/', testemonialsController.addTestemonial);

router.patch('/:tid', testemonialsController.updateTestemonial);

router.delete('/:tid', testemonialsController.deleteTestemonial);

module.exports = router;