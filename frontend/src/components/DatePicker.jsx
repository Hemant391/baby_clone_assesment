import { useState } from "react";

const DatePicker = ({ onDateSelect  }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    onDateSelect (e.target.value);
  };

  return (
    <div className="p-4 flex items-center justify-center gap-4">
      <label className="block text-lg font-bold">Select Date:</label>
      <input type="date" value={selectedDate} onChange={handleChange} className="mt-2 p-2 border rounded " />
    </div>
  );
};

export default DatePicker;