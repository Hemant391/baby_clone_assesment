const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { calculateAvailableSlots } = require('../utils/timeSlotUtils');

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctor = async(req, res)=>{
  try {
    const id = req.params.id
    const doctor = await Doctor.findById(id);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAvailableSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const date = req.query.date;
    if (!date) return res.status(400).json({ message: 'Date query parameter is required' });

    const existingAppointments = await Appointment.find({ doctorId: doctor._id, date: { $gte: new Date(date) } });
    const availableSlots = calculateAvailableSlots(doctor.workingHours, existingAppointments);

    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDoctors, getDoctor, getAvailableSlots };
