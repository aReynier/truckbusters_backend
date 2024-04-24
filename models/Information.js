import mongoose from 'mongoose';

const informationSchema = mongoose.Schema({
    opening_hour: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    secretary_phone: { type: String, required: true },
    secretary_email: { type: String, required: true }
   });

export default mongoose.model('Information', informationSchema, 'informations');