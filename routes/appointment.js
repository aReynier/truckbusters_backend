import express from 'express';
const router = express.Router()
import appointmentController from '../controllers/appointment.js';

router.get('/', appointmentController.findAllAppointment)
router.get('/:id', appointmentController.findOneAppointment)
router.post('/', appointmentController.makeAppointment)

export default router;