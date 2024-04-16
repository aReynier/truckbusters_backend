import Appointment from '../models/Appointment.js';
import Company from '../models/Company.js';
import Driver from '../models/Driver.js';
import Truck from '../models/Truck.js';
import CompanyDriver from '../models/CompanyDriver.js';
import DriverTruck from '../models/DriverTruck.js';

const appointmentController = {
    makeAppointment: async  (req, res, next) => { 
        try {
            const { appointmentData, companyData, driverData, truckData } = req.body;

            const { moment, deck } = appointmentData;
            const { name, email, phone} = companyData;
            const { firstname, lastname, phone: driverPhone } = driverData;
            const { brand, model, license_plate } = truckData;

            if (!moment || !deck || !name || !email || !firstname || !lastname || !brand || !model || !license_plate) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const driver = new Driver({
                firstname: firstname,
                lastname: lastname,
                phone: driverPhone
            });

            await driver.save()

            const company = new Company({
                name: name,
                email: email,
                phone: phone
            });

            await company.save()

            const companyDriver = new CompanyDriver({
                id_company: company._id,
                id_driver: driver._id
            })

            await companyDriver.save()

            const truck = new Truck({
                brand: brand,
                model: model,
                license_plate: license_plate
            });

            await truck.save()

            const driverTruck = new DriverTruck({
                id_driver: driver._id,
                id_truck: truck._id
            })

            await driverTruck.save()

            const appointment = new Appointment({
                moment: moment,
                deck: deck,
                id_driver: driver._id,
                id_truck: truck._id,
                id_company: company._id
            });

            await appointment.save()

            console.log("trying creating appointment");
            res.status(201).json({ message: 'appointment created!'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findAllAppointment: async (req, res, next) => {
        try {
            const [appointments, companies, drivers, trucks] = await Promise.all([
                Appointment.find()
            ]);

            console.log("Here all the appointements")
            res.status(200).json({ appointments, companies, drivers, trucks });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findOneAppointment: async (req, res, next) => {
        try { 
            const appointment = await Appointment.findById(req.params.id);
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            const driver = await Driver.findById(appointment.id_driver);

            const truck = await Truck.findById(appointment.id_truck);

            const company = await Company.findById(appointment.id_company);

            console.log("Here one specific appointment")
            res.status(200).json({ appointment, driver, truck, company});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default appointmentController