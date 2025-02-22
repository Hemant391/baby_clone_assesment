import { useEffect, useState } from "react";
import { fetchAppointments, deleteAppointment } from "../api/api";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("data")
    fetchAppointments().then((data) => {
      console.log(data)
      setAppointments(data);
      setLoading(false);
    }).catch((err)=> console.log(err));
  }, []);

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setAppointments(appointments.filter((appt) => appt._id !== id));
  };



  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Your Appointments</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id} className="bg-gray-100 p-4 rounded-lg mb-2">
              <p><strong>{appt.patientName}</strong> - {appt.appointmentType} at {new Date(appt.date).toLocaleString()}</p>
              <button  className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(appt._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentList;