import mongoose from 'mongoose';

const companyDriverSchema = mongoose.Schema({
    id_company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    id_driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true }
});

export default mongoose.model('CompanyDriver', companyDriverSchema);