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
    if (field === 'startTime') {
      updatedTimeSlots[index].startTime.time = time;
    } else {
      updatedTimeSlots[index].endTime.time = time;
    }
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
  };

  const handleDayChange = (day, index, field) => {
    const updatedTimeSlots = [...formData.timeSlots];
    if (field === 'endTime') {
      updatedTimeSlots[index].endTime.day = day;
    } else {
      updatedTimeSlots[index].startTime.day = day;
    }
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
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

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>
      {/* <div>
          <label>Features:</label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          />
        </div>
      {formData.features.map((feature, index) => (
        <div key={index}>{feature}</div>
      ))} */}
      <button onClick={handleAddFeature}>
        Add Feature
      </button>
      {formData.features.map((feature, index) => (
        <div key={index}>{feature}</div>
      ))}
      {formData.timeSlots.map((timeSlot, index) => (
        <div key={index}>
          <label>Start Day:</label>
          <select
            value={formData.timeSlots[index].startTime.day}
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
          <label>Start Time</label>
          <TimePicker
            onChange={(time) => handleTimeChange(time, index, 'startTime')}
            value={formData.timeSlots[index].startTime.time}
            format="HH:mm"
            disableClock={true}
          />
          <p>Selected Time: {timeSlot.startTime.time}</p>


          <label>End Day:</label>
          <select
            value={formData.timeSlots[index].endTime.day}
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
          <label>End Time</label>
          <TimePicker
            onChange={(time) => handleTimeChange(time, index, 'endTime')}
            value={formData.timeSlots[index].endTime.time}
            format="HH:mm"
            disableClock={true}
          />
          <p>Selected Time: {timeSlot.endTime.time}</p>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterStadium;
