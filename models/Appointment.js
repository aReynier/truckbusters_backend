import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
    moment: { type: Date, required: true },
    deck: { type: Number, required: true },
    id_drivers: [{ type: Schema.types.ObjectId, ref: "Driver", required: true }]
   });

module.exports = mongoose.model('appointment',appointmentSchema);