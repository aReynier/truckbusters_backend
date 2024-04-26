import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

import appointmentRouter from './routes/appointment.js';
import informationRouter from './routes/information.js';

import swaggerDocs from './swagger.js'

const app = express();
const port = 3002
const version = "v1"

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); //fix helmet not same origin error
  next();
});

app.use(cors())

dotenv.config();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    swaggerDocs(app, port)
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iajdy8a.mongodb.net/truckbusters?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('MongoDB connexion success !'))
  .catch(() => console.log('MongoDB connexion fail !'));

app.use(bodyParser.json());

app.use(mongoSanitize());

app.use(`/api/${version}/appointment`, appointmentRouter)
app.use(`/api/${version}/information`, informationRouter)