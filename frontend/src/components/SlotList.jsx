import { useEffect, useState } from "react";
import { fetchAvailableSlots } from "../api/api";

const SlotList = ({ doctorId, date, onSelectSlot }) => {

  const [duration, setDuration ] = useState("");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Available Slots hi hai yeh </h2>

        <ul className="grid grid-cols-2 gap-4">
            <li  className="bg-green-200 p-2 rounded-lg cursor-pointer" onClick={() => setDuration("30")}>30</li>
            <li className="bg-green-200 p-2 rounded-lg cursor-pointer" onClick={() => setDuration("60")}>
            60</li>
        </ul>
    </div>
  );
};

export default SlotList;
