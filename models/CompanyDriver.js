import mongoose from 'mongoose';

const companyDriverSchema = mongoose.Schema({
    id_company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    id_driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true }
});

module.exports = mongoose.model('CompanyDriver', companyDriverSchema);