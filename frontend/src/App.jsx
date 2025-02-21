import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorSelection from "./pages/DoctorSelection";
import Appointment from "./pages/Appointment";
import AppointmentList from "./pages/AppointmentList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorSelection />} />
          <Route path="/appointment/:doctorId" element={<Appointment />} />
          <Route path="/appointments" element={<AppointmentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
