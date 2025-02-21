import { useEffect, useState } from "react";
import { fetchAppointments, deleteAppointment, updateAppointment } from "../api/api";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [updatedData, setUpdatedData] = useState({ patientName: "", appointmentType: "" });

  useEffect(() => {
    fetchAppointments().then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setAppointments(appointments.filter((appt) => appt._id !== id));
  };

  const handleEdit = (appt) => {
    setEditing(appt._id);
    setUpdatedData({ patientName: appt.patientName, appointmentType: appt.appointmentType });
  };

  const handleUpdate = async (id) => {
    await updateAppointment(id, updatedData);
    setAppointments(appointments.map((appt) => (appt._id === id ? { ...appt, ...updatedData } : appt)));
    setEditing(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Your Appointments</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id} className="bg-gray-100 p-4 rounded-lg mb-2">
              <p><strong>{appt.patientName}</strong> - {appt.appointmentType} at {new Date(appt.date).toLocaleString()}</p>
              <button onClick={() => handleEdit(appt)} className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(appt._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;