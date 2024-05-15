import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { getStadiumById } from "../../api/internal";
import { useParams } from "react-router-dom";
import { bookStadium } from "../../api/internal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "../../components/Protected/Protected";
import { useSelector } from "react-redux";

function Stadium() {
  const { id } = useParams();
  const [stadium, setStadium] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuth = useSelector(state => state.user.auth);

  useEffect(() => {
    const fetchStadiumDetails = async () => {
      try {
        const response = await getStadiumById(id);
        setStadium(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStadiumDetails();
  }, [id]);

  const handleBookStadium = timeslotId => {
    // Check if stadium and timeslotId are valid
    if (stadium && timeslotId) {
      // Confirm booking
      if (window.confirm("Confirm Booking?")) {
        console.log("Booking timeslot ID:", timeslotId);
        // Proceed with booking

        // Call the function to book the timeslot
        bookStadium(id, timeslotId)
          .then(response => {
            // Handle success
            if (response.status === 201) {
              console.log("Timeslot booked successfully:", response);

              toast.success("Booking successful!", {
                position: "top-right",
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              console.error("Error booking timeslot:", error);
              toast.error("Time Slot not available...", {
                position: "top-right",
                autoClose: 3000, // Close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch(error => {
            // Handle error
            console.error("Error booking timeslot:", error);
            toast.error("Error booking timeslot. Please try again later.", {
              position: "top-right",
              autoClose: 3000, // Close the toast after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    } else {
      console.error("Invalid stadium or timeslot ID");
      // Optionally, show an error message to the user
    }
  };

  if (isLoading) {
    return <Loader text="Loading stadium details" />;
  }
  if (isLoading) {
    return <Loader text=" stadium details" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto" style={{ marginTop: "100px" }}>
      {stadium && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-2">{stadium.name}</h2>
          <p className="text-gray-600 mb-2">{stadium.location}</p>
          <h3 className="text-lg font-semibold mb-2">Features:</h3>
          <ul>
            {stadium.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Time Slots:</h3>
          <ul>
            {stadium.timeSlots.map((slot, index) => (
              <li key={index}>
                Start Day: {slot.startTime.day} - End Day: {slot.endTime.day} -
                Start Time: {slot.startTime.time} - End Time:{" "}
                {slot.endTime.time}
                <Protected isAuth={isAuth}>
                  <button
                    onClick={() => handleBookStadium(slot._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ml-5"
                  >
                    Book Timeslot
                  </button>
                </Protected>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Stadium;
