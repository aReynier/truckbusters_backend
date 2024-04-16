import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: Number, required: true },
    phone: { type: String, required: false }
   });

module.exports = mongoose.model('company',companySchema);