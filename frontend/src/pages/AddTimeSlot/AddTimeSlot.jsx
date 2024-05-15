import React, { useState } from "react";
import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addTimeSlot } from "../../api/internal";

const AddTimeSlot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [timeSlot, setTimeSlot] = useState({
    startTime: { day: "", time: "" },
    endTime: { day: "", time: "" }
  });

  const handleTimeChange = (time, field) => {
    setTimeSlot({
      ...timeSlot,
      [field]: { ...timeSlot[field], time: time }
    });
  };

  const handleDayChange = (day, field) => {
    setTimeSlot({
      ...timeSlot,
      [field]: { ...timeSlot[field], day: parseInt(day) }
    });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const response = await addTimeSlot(id, timeSlot);
    if (response.status === 201) {
      navigate("/");
    } else if (response === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-100" style={{ marginTop: "100px" }} onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Start Day:</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={timeSlot.startTime.day}
            onChange={e => handleDayChange(e.target.value, "startTime")}
          >
            <option value="">Select Day</option>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>

          <label className="block mb-2">Start Time:</label>
          <TimePicker
            className="w-full px-3 py-2 border rounded-md"
            onChange={time => handleTimeChange(time, "startTime")}
            value={timeSlot.startTime.time}
            format="HH:mm"
            disableClock={true}
          />

          <label className="block mb-2">End Day:</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={timeSlot.endTime.day}
            onChange={e => handleDayChange(e.target.value, "endTime")}
          >
            <option value="">Select Day</option>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>

          <label className="block mb-2">End Time:</label>
          <TimePicker
            className="w-full px-3 py-2 border rounded-md"
            onChange={time => handleTimeChange(time, "endTime")}
            value={timeSlot.endTime.time}
            format="HH:mm"
            disableClock={true}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Time Slot
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AddTimeSlot;
