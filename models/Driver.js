import mongoose from 'mongoose';

const driverSchema = mongoose.Schema({
    firstname: { type: Timestamp, required: true },
    lastname: { type: Number, required: true },
    phone: { type: String, required: false }
   });

module.exports = mongoose.model('driver',driverSchema);