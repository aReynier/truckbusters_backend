import mongoose from 'mongoose';

const secretarySchema = mongoose.Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true }
   });

module.exports = mongoose.model('secretary',secretarySchema);