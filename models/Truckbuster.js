import mongoose from 'mongoose';

const truckbusterSchema = mongoose.Schema({
    opening_hour: { type: String, required: true }
   });

module.exports = mongoose.model('truckbuster',truckbusterSchema);