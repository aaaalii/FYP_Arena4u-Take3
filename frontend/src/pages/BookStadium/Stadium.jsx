import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { getStadiumById } from '../../api/internal';
import { useParams } from 'react-router-dom';
import { bookStadium } from '../../api/internal';

function Stadium() {
    const { id } = useParams();
    const [stadium, setStadium] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleBookStadium = (timeslotId) => {
        // Check if stadium and timeslotId are valid
        if (stadium && timeslotId) {
            // Call the function to book the timeslot
            console.log(timeslotId);
            bookStadium(id, timeslotId)
                .then((response) => {
                    // Handle success
                    console.log('Timeslot booked successfully:', response);
                    // Optionally, update the UI to reflect the booking
                })
                .catch((error) => {
                    // Handle error
                    console.error('Error booking timeslot:', error);
                    // Optionally, show an error message to the user
                });
        } else {
            console.error('Invalid stadium or timeslot ID');
            // Optionally, show an error message to the user
        }
    };

    if (isLoading) {
        return <Loader text="Loading stadium details" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto" style={{ marginTop: '100px' }}>
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
                                Start Day: {slot.startTime.day} - End Day: {slot.endTime.day} - Start Time: {slot.startTime.time} - End Time: {slot.endTime.time}
                                <button onClick={() => handleBookStadium(slot._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                                    Book Timeslot
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Stadium;
