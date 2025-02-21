import { useState } from "react";
import { bookAppointment } from "../api/api";

const AppointmentForm = ({ doctorId, slot, onSuccess }) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("Routine Check-Up");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAppointment = {
      doctorId,
      date: slot,
      duration: 30,
      appointmentType,
      patientName,
      notes,
    };
    await bookAppointment(newAppointment);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label>Patient Name:</label>
      <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="block p-2 border rounded" required />
      
      <label>Appointment Type:</label>
      <select value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} className="block p-2 border rounded">
        <option>Routine Check-Up</option>
        <option>Ultrasound</option>
      </select>

      <label>Notes (Optional):</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="block p-2 border rounded"></textarea>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-3">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
