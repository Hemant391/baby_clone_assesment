import axios from "axios";


export const BASE_URL = "http://localhost:5000";

export const fetchDoctors = async () => {
  const res = await fetch(`${BASE_URL}/doctors`);
  return res.json();
};

export const fetchAvailableSlots = async (doctorId, date) => {
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}/slots?date=${date}`);
  return res.json();
};

export const fetchAppointments = async () => {
  const res = await fetch(`${BASE_URL}/appointments`);
  return res.json();
};

export const bookAppointment = async (appointmentData) => {
  const res = await axios.post(`${BASE_URL}/appointments/`, appointmentData);
  return res.data;
};

export const updateAppointment = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deleteAppointment = async (id) => {
  await fetch(`${BASE_URL}/appointments/${id}`, { method: "DELETE" });
};


