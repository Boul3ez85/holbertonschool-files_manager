const express = require('express');
const router = express.Router();
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

router.get('/status', AppController.getStatus.bind(AppController))
router.get('/stats', AppController.getStats.bind(AppController));

router.post('/users', UsersController.postNew.bind(UsersController));

export default router;
