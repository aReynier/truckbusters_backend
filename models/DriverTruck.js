import mongoose from 'mongoose';

const driverTruckSchema = mongoose.Schema({
    id_driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    id_truck: { type: mongoose.Schema.Types.ObjectId, ref: "Truck", required: true }
});

export default mongoose.model('DriverTruck', driverTruckSchema);