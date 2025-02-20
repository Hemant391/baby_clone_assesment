require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctorRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/doctors', doctorRoutes);
// app.use('/appointments', appointmentRoutes);
app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
