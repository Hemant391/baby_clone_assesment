import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-end absolute top-0 w-full p-2">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg active:bg-blue-700" onClick={()=> navigate('/appointments')}>View Appointments</button>
    </div>
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-5xl font-bold">Welcome to Prenatal Care Booking</h1>
      <button
        onClick={() => navigate("/doctors")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg active:bg-blue-700"
        >
        View Doctors
      </button>
    </div>
        </>
  );
};

export default Home;