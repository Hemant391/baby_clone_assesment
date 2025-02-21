import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { bookAppointment } from "../api/api.js";
import { BASE_URL } from "../api/api.js";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Appointment = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("Routine Check-Up");
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState("");

  const fetchDoctorSlots = async (doctorId) => {
    const res = await axios.get(
      `${BASE_URL}/doctors/${doctorId}/slots?date=${new Date().toISOString().split("T")[0]}`
    );
    setSlots(res.data);
  };

  useEffect(() => {
    fetchDoctorSlots(doctorId);
  }, [doctorId]);

  const handleSubmit = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get("date");

    await bookAppointment({
      doctorId,
      date: dateParam,
      slot: selectedSlot,
      patientName,
      appointmentType,
      duration,
      notes,
    });

    alert("Appointment booked successfully");
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Book an Appointment</h2>

      {/* Patient Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Patient Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

      {/* Appointment Type Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Appointment Type:</label>
        <select
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>Routine Check-Up</option>
          <option>Ultrasound</option>
        </select>
      </div>

      {/* Duration Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Duration (Minutes):</label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>30</option>
          <option>60</option>
        </select>
      </div>

      {/* Available Slots */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Available Slots:</label>
        <div className="grid grid-cols-3 gap-2">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-2 border rounded-lg transition-all ${
                  selectedSlot === slot ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {slot}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No slots available</p>
          )}
        </div>
      </div>

      {/* Notes Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Notes (Optional):</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add any notes (e.g., symptoms, concerns, etc.)"
          rows="3"
        />
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleSubmit}
        className={`w-full p-3 rounded-lg text-white font-bold transition-all ${
          selectedSlot && patientName ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!selectedSlot || !patientName}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Appointment;
