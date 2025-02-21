const Appointment = require('../models/Appointment');
const { validateAppointment } = require('../utils/timeSlotUtils');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message,error });
  }
};

const getAppointment = async (req, res) => {
  try {
    const id = req.params.id
    const appointments = await Appointment.findById(id).populate('doctorId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message,error });
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
    res.status(500).json({ message: error.message,error });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { doctorId, date, duration=30, appointmentType, patientName, notes } = req.body;

    const existingAppointment = await Appointment.findById(req.params.id);
    if (!existingAppointment) return res.status(404).json({ message: 'Appointment not found' });

    const isValid = await validateAppointment(doctorId, date, duration);
    if (!isValid) return res.status(400).json({ message: 'Updated time slot not available' });

    existingAppointment.doctorId = doctorId;
    existingAppointment.date = date;
    existingAppointment.duration = duration;
    existingAppointment.appointmentType = appointmentType;
    existingAppointment.patientName = patientName;
    existingAppointment.notes = notes;

    await existingAppointment.save();

    res.status(200).json(existingAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message,error });
  }
};

// **Delete Appointment**
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.deleteOne();
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message,error });
  }
};

module.exports = { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment };
