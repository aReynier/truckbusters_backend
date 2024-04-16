import mongoose from 'mongoose';

const driverSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: false }
   });

export default mongoose.model('Driver', driverSchema);