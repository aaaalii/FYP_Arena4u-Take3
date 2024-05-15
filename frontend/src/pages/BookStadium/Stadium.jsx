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
    return <Loader text=" stadium details" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mb-60" style={{ marginTop: "100px" }}>
      <h1 className="text-slate-800 font-extrabold text-3xl text-center pt-10 mb-10">
        Stadium Details
      </h1>
      {stadium && (
        <div className="px-3 mt-10 mx-2 basis-1/3" key={stadium._id}>
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
                <h2 class="text-neutral-50 font-bold text-xl italic ms-4 my-2">
                  {stadium.name}
                </h2>
                <p className="text-white ms-4 my-1">{stadium.location}</p>
                <h3 className="text-white ms-4 my-1 font-semibold">
                  Features:
                </h3>
                <ul className="text-white ms-7 my-1">
                  {stadium.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-white ms-4 my-1">
                  Time Slots:
                </h3>
                <ul className="text-white ms-7 my-1">
                  {stadium.timeSlots.map((slot, index) => (
                    <li key={index}>
                      Start Day: {slot.startTime.day} - End Day:{" "}
                      {slot.endTime.day} - Start Time: {slot.startTime.time} -
                      End Time: {slot.endTime.time}
                      <Protected isAuth={isAuth}>
                        <button
                          onClick={() => handleBookStadium(slot._id)}
                          className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-4 py-2 hoverBtn ml-2"
                        >
                          Book Timeslot
                        </button>
                      </Protected>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stadium;
