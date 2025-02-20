const Appointment = require('../models/Appointment');
const { validateAppointment } = require('../utils/timeSlotUtils');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

    const isValid = await validateAppointment(doctorId, date, duration);
    if (!isValid) return res.status(400).json({ message: 'Time slot not available' });

    const newAppointment = new Appointment({ doctorId, date, duration, appointmentType, patientName, notes });
    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAppointments, createAppointment };
