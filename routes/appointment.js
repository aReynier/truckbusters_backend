import express from 'express';
const router = express.Router()
import appointmentController from '../controllers/appointment.js';

router.get('/', appointmentController.findAll)
router.get('/:id', appointmentController.findById)
router.post('/', appointmentController.create)

export default router;