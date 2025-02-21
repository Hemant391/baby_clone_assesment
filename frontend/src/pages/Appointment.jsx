import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  bookAppointment } from "../api/api.js";
import { BASE_URL } from "../api/api.js";
import axios from "axios";

const Appointment = () => {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("Routine Check-Up");

   const fetchDoctors = async () => {
    const res = await fetch(`${BASE_URL}/doctors`);
    return res.json();
  };
   const fetchDoctorSlots = async (doctorId) => {
    const res = await axios.get(`${BASE_URL}/doctors/${doctorId}/slots?date=${new Date().toISOString().split('T')[0]}`);
    const response=res.data;
    
    setSlots(response);
  };
  useEffect(() => {
    fetchDoctorSlots(doctorId)
   
  }, [doctorId]);

  const handleSubmit = async () => {
    await bookAppointment({ doctorId, date: selectedSlot, patientName, appointmentType });
    alert("Appointment booked successfully");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Book Appointment</h2>
      <div className="mb-4">
        <label className="block">Patient Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Appointment Type:</label>
        <select
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option>Routine Check-Up</option>
          <option>Ultrasound</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block">Available Slots:</label>
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`p-2 border rounded ${selectedSlot === slot ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 rounded"
        disabled={!selectedSlot || !patientName}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Appointment;