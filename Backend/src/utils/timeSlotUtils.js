const moment = require('moment');

const calculateAvailableSlots = (workingHours, appointments) => {
  const { start, end } = workingHours;
  let slots = [];
  let time = moment(start, 'HH:mm');

  while (time.isBefore(moment(end, 'HH:mm'))) {
    if (!appointments.some(app => moment(app.date).format('HH:mm') === time.format('HH:mm'))) {
      slots.push(time.format('HH:mm'));
    }
    time.add(30, 'minutes');
  }

  return slots;
};

const validateAppointment = async (doctorId, date, duration) => {
  const appointments = await Appointment.find({ doctorId, date });
  return appointments.length === 0;
};

module.exports = { calculateAvailableSlots, validateAppointment };
