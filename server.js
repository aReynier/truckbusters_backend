import express from 'express';
const app = express();
const port = 3002
const version = "v1"

import router from './routes/appointment.js';

app.use(`/api/${version}/appointment`, router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})