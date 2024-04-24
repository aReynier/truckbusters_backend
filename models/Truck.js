import mongoose from 'mongoose';

const truckSchema = mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    license_plate: { type: String, required: true }
   });

export default mongoose.model('Truck', truckSchema);