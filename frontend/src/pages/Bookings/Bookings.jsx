import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { userBookings } from '../../api/internal';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container mx-auto mt-100"
    style={{ marginTop: '100px' }}>
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {loading ? (
        <Loader text="bookings" />
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking, index) => ( 
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{booking.stadiumName}</h2> 
              <p className="text-gray-600 mb-2">Timeslot: {booking.timeSlot.startTime.time} - {booking.timeSlot.endTime.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
