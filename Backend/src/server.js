require('dotenv').config({ path: '.env' });
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 4000;  

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', '*'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, { dbname: 'AppointmentBooking' })
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));  
  })
  .catch(err => console.error(err));
