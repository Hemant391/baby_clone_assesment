import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to Prenatal Care Booking</h1>
      <button
        onClick={() => navigate("/doctors")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        View Doctors
      </button>
    </div>
  );
};

export default Home;