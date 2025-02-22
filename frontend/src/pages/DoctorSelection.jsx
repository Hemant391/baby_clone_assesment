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
    <div className="p-4 flex flex-col justify-center items-center container mx-auto max-w-[1200px] overflow-auto ">
      <h2 className="text-xl font-bold ">Select a Doctor</h2>
      <DatePicker onDateSelect={setSelectedDate} />
      <ul className="mt-4 flex flex-wrap justify-center items-center gap-3 h-[78vh] overflow-auto">
        {console.log(doctors)}
        {doctors.map((doctor) => (
          <li key={doctor._id} className="p-4 rounded-lg mb-2 bg-gray-300 flex items-center justify-center flex-col w-[250px] h-[150px] shadow-xl">
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