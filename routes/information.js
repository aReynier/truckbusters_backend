import express from 'express';
const router = express.Router()
import informationController from '../controllers/information.js';

router.get('/', informationController.findAllInformation)

export default router;