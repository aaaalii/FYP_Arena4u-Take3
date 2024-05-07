import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import { registerStadium } from '../../api/internal';
import { useNavigate } from "react-router-dom";

function RegisterStadium() {

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    features: [],
    timeSlots: [{
      startTime: { day: 0, time: '' },
      endTime: { day: 0, time: '' }
    }]
  });

  const handleTimeChange = (time, index, field) => {
    const updatedTimeSlots = [...formData.timeSlots];
    updatedTimeSlots[index][field].time = time;
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
  };

  const handleDayChange = (day, index, field) => {
    const updatedTimeSlots = [...formData.timeSlots];
    updatedTimeSlots[index][field].day = day;
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
  };

  const handleAddTimeSlot = () => {
    setFormData({
      ...formData,
      timeSlots: [
        ...formData.timeSlots,
        {
          startTime: { day: 0, time: '' },
          endTime: { day: 0, time: '' }
        }
      ]
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await registerStadium(formData);
    if (response.status === 201) {
      navigate('/');
    }
    else if (response === 'ERR_BAD_REQUEST') {
      setError(response.response.data.message);
    }
  }

  const handleAddFeature = () => {
    const newFeature = prompt('Enter a new feature:');
    if (newFeature) {
      setFormData({ ...formData, features: [...formData.features, newFeature] });
    }
  };

  // const handleAddTimeSlot = () => {
  //   const newTimeSlot = {
  //     startTime: { day: 0, time: '' },
  //     endTime: { day: 0, time: '' }
  //   };
    
  //   setFormData(prevState => {
  //     const newState = {
  //       ...prevState,
  //       timeSlots: [...prevState.timeSlots, newTimeSlot]
  //     };
  //     console.log('New State:', newState); // Check the new state
  //     return newState;
  //   });
  // };
  
  
  

  return (
    <form className="max-w-md mx-auto mt-100"
      style={{ marginTop: '100px' }}
      onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          className="w-full px-3 py-2 border rounded-md text-bold"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Location:</label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          type="text"
          name="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleAddFeature}
      >
        Add Feature
      </button>
      {formData.features.map((feature, index) => (
        <div key={index} className="mb-2">{feature}</div>
      ))}
      {formData.timeSlots.map((timeSlot, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">Start Day:</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={timeSlot.startTime.day}
              onChange={(e) => handleDayChange(parseInt(e.target.value), index, 'startTime')}
            >
              <option value="">Select Day</option>
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
            </select><br />
            <label className="block mb-2">Start Time</label>
            <TimePicker
              className="w-full px-3 py-2 border rounded-md"
              onChange={(time) => handleTimeChange(time, index, 'startTime')}
              value={timeSlot.startTime.time}
              format="HH:mm"
              disableClock={true}
            />
            <p className="mb-2">Selected Time: {timeSlot.startTime.time}</p>

            <label className="block mb-2">End Day:</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={timeSlot.endTime.day}
              onChange={(e) => handleDayChange(parseInt(e.target.value), index, 'endTime')}
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
            <label className="block mb-2">End Time</label>
            <TimePicker
              className="w-full px-3 py-2 border rounded-md"
              onChange={(time) => handleTimeChange(time, index, 'endTime')}
              value={timeSlot.endTime.time}
              format="HH:mm"
              disableClock={true}
            />
            <p className="mb-2">Selected Time: {timeSlot.endTime.time}</p>
          </div>
        ))}

      {/* Button to add a time slot */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleAddTimeSlot}
      >
        Add Time Slot
      </button>
      <br />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterStadium;
