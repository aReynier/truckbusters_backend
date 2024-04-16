import mongoose from 'mongoose';

const { Schema } = mongoose

const appointmentSchema = mongoose.Schema({
    moment: { type: Date, required: true },
    deck: { type: Number, required: true },
    id_driver: [{ type: Schema.Types.ObjectId, ref: "Driver", required: true }],
    id_truck: [{ type: Schema.Types.ObjectId, ref: "Truck", required: true }],
    id_company: [{ type: Schema.Types.ObjectId, ref: "Company", required: true }]
   });

export default mongoose.model('Appointment', appointmentSchema);