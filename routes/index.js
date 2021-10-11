const express = require('express');
const router = express.Router();
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

router.get('/status', AppController.getStatus.bind(AppController))
router.get('/stats', AppController.getStats.bind(AppController));

router.post('/users', UsersController.postNew.bind(UsersController));

router.get('/connect', AuthController.getConnect.bind(AuthController));
router.get('/disconnect', AuthController.getDisconnect.bind(AuthController));
router.get('/users/me', UserController.getMe.bind(UsersController));


export default router;
