import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { userBookings } from "../../api/internal";
import { useNavigate } from "react-router-dom";

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
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleBookingNavigation = () => {
    navigate("/stadiums"); // Navigate to the booking page (adjust the path as necessary)
  };

  return (
    <div className="container mx-auto mb-72" style={{ marginTop: "100px" }}>
      <h1 className="text-slate-800 font-extrabold text-3xl text-center pt-10 mb-10">
        My Bookings
      </h1>
      {loading ? (
        <Loader text="bookings" />
      ) : bookings.length > 0 ? (
        <div class="group overflow-hidden p-5 duration-1000 hover:duration-1000 relative h-1/2 bg-slate-800 rounded-xl">
          <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
          <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
          <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
          <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
          <div class="w-full h-full p-3 bg-neutral-700 bg-opacity-50 rounded-xl flex-col gap-2 flex justify-center">
            <div className="text-opacity-100 z-10">
              {bookings.map((booking, index) => (
                <div key={index} className="rounded-lg p-4">
                  <h2 className="text-xl text-white ms-4 my-1">
                    {booking.stadiumName}
                  </h2>
                  <p className="text-white ms-4 my-1">
                    Timeslot: {booking.timeSlot.startTime.time} -{" "}
                    {booking.timeSlot.endTime.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>You have not booked any time slots.</p>
          <button
            onClick={handleBookingNavigation}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Click here to book
          </button>
        </div>
      )}
    </div>
  );
}

export default Bookings;
