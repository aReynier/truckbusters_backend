import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false }
   });

export default mongoose.model('Company', companySchema);