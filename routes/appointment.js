import express from 'express';
const router = express.Router()
import appointmentController from '../controllers/appointment.js';

router.get('/', appointmentController.findAllAppointment)
router.get('/:id', appointmentController.findOneAppointment)
router.post('/', appointmentController.makeAppointment)

/**
 * @openapi
 * tags:
 *   name: Appointments
 *   description: Operations related to appointments
 * 
 * @openapi
 * tags:
 *   name: Information
 *   description: Operations related to information
 */

/**
 * @openapi
 * /api/v1/appointment:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment along with associated company, driver, and truck details.
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentRequest'
 *           examples:
 *             default:
 *               value:
 *                 appointmentData:
 *                   moment: "2024-04-20T08:02:00.000Z"
 *                   deck: 1
 *                 companyData:
 *                   name: "Ma petite entreprise"
 *                   email: "petite-entreprise@entreprise.fr"
 *                   phone: "0327642535"
 *                 driverData:
 *                   firstname: "Pierre"
 *                   lastname: "Martin"
 *                   phone: "0327442612"
 *                 truckData:
 *                   brand: "Volvo"
 *                   model: "FH14"
 *                   license_plate: "894gfd27"
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *
 * @openapi
 * /api/v1/appointment:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve a list of all appointments, including associated company, driver, and truck details.
 *     tags: [Appointments]
 *     responses:
 *       '200':
 *         description: A list of appointments, companies, drivers, and trucks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentList'
 *       '400':
 *         description: Bad Request
 * 
 * @openapi
 * /api/v1/appointment/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     description: Retrieve details of a specific appointment identified by its unique ID.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the appointment to get
 *     responses:
 *       '200':
 *         description: Appointment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentDetails'
 *       '404':
 *         description: Appointment not found
 *       '400':
 *         description: Bad Request
 */

export default router;