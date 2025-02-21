import { useEffect, useState } from "react";
import { fetchDoctors } from "../api/api";

const DoctorList = ({ onSelectDoctor }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors().then((data) => {
      setDoctors(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Select a Doctor</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="grid grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <li key={doctor._id} className="bg-gray-100 p-4 rounded-lg cursor-pointer" onClick={() => onSelectDoctor(doctor)}>
              {doctor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorList;
