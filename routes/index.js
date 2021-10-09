const express = require('express');
const router = express.Router();
import AppController from '../controllers/AppController';

router.get('/status', AppController.getStatus.bind(AppController))

router.get('/stats', AppController.getStats.bind(AppController));



export default router;
