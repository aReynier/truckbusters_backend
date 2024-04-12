import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3002
const version = "v1"
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/appointment.js';

app.use(`/api/${version}/appointment`, router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iajdy8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('MongoDB connexion success !'))
  .catch(() => console.log('MongoDB connexion fail !'));