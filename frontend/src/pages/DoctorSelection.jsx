import { useEffect, useState } from "react";
import { fetchDoctors } from "../api/api";
import { useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";

const DoctorSelection = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors().then(setDoctors);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Select a Doctor</h2>

      <DatePicker onDateSelect={setSelectedDate} />

      <ul className="mt-4">
        {doctors.map((doctor) => (
          <li key={doctor._id} className="bg-gray-100 p-4 rounded-lg mb-2">
            <p><strong>{doctor.name}</strong></p>
            <button
              onClick={() => navigate(`/appointment/${doctor._id}?date=${selectedDate}`)}
              className="bg-blue-500 text-white p-2 rounded mt-2"
              disabled={!selectedDate}
            >
              View Available Slots
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSelection;
