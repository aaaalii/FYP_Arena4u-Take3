function AddTimeSlot (){

    const [formData, setFormData] = useState({
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
    
    return(
        <div>
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
        </div>
    );
}

export default AddTimeSlot;