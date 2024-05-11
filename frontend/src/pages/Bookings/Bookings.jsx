import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { userBookings } from '../../api/internal';
import { useNavigate } from 'react-router-dom';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await userBookings(); // API call to fetch bookings
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleBookingNavigation = () => {
    navigate('/stadiums'); // Navigate to the booking page (adjust the path as necessary)
  };

  return (
    <div className="container mx-auto mt-100" style={{ marginTop: '100px' }}>
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {loading ? (
        <Loader text="bookings" />
      ) : bookings.length > 0 ? (
        <div className="grid gap-4">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{booking.stadiumName}</h2>
              <p className="text-gray-600 mb-2">Timeslot: {booking.timeSlot.startTime.time} - {booking.timeSlot.endTime.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>You have not booked any time slots.</p>
          <button onClick={handleBookingNavigation} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Click here to book
          </button>
        </div>
      )}
    </div>
  );
}

export default Bookings;
