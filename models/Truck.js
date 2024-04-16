import mongoose from 'mongoose';

const truckSchema = mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: Number, required: true },
    license_plate: { type: Number, required: true }
   });

module.exports = mongoose.model('truck',truckSchema);