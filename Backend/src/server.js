require('dotenv').config({ path: '.env' });
const cors=require('cors');

const express = require('express');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');
const errorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173',"*"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI,{dbname:'AppointmentBooking'})
  .then(() => app.listen(process.env.port, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
