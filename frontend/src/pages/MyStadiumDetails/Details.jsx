import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getStadiumById, deleteStadium } from '../../api/internal'; // Import API functions for getting stadium by ID and deleting stadium
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus } from 'react-icons/hi'; // Import icons for buttons

const Detail = () => {
    const { id } = useParams(); // Get stadium ID from URL params
    const navigate = useNavigate();
    const [stadium, setStadium] = useState(null);
    const [showStadiumForm, setShowStadiumForm] = useState(false); // State to control visibility of stadium update form
    const [showTimeSlotForm, setShowTimeSlotForm] = useState(false); // State to control visibility of time slot add form

    useEffect(() => {
        const fetchStadium = async () => {
            try {
                // Fetch stadium by ID from API
                const response = await getStadiumById(id); // Assuming getStadiumById fetches stadium details by ID
                setStadium(response.data); // Set stadium state with fetched data
            } catch (error) {
                console.error('Error fetching stadium:', error);
            }
        };

        fetchStadium();
    }, [id]); // Fetch stadium details whenever ID changes

    const handleDeleteStadium = async () => {
        try {
            // Delete stadium by ID from API
            await deleteStadium(id);
            navigate('/my-stadiums');// Redirect to my stadiums page after deletion
        } catch (error) {
            console.error('Error deleting stadium:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '100px' }}>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">{stadium ? stadium.name : 'Stadium Name'}</h1>
                <div>
                    <button onClick={() => setShowStadiumForm(true)} className="text-gray-600 hover:text-gray-900 mr-4">
                        <HiOutlinePencilAlt className="w-6 h-6" />
                    </button>
                    <button onClick={handleDeleteStadium} className="text-red-600 hover:text-red-900">
                        <HiOutlineTrash className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Stadium Details */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <p><span className="font-semibold">Location:</span> {stadium ? stadium.location : 'Location'}</p>
                <p><span className="font-semibold">Features:</span> {stadium ? stadium.features.join(', ') : 'Features'}</p>
            </div>

            {/* Time Slots */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Time Slots</h2>
                {stadium && stadium.timeSlots.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {stadium.timeSlots.map(timeSlot => (
                            <li key={timeSlot.id} className="py-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{timeSlot.startTime.time} - {timeSlot.endTime.time}</p>
                                        {/* <p>{timeSlot.day}</p> */}
                                    </div>
                                    <div>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <HiOutlinePencilAlt className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No time slots available</p>
                )}

                <button onClick={() => setShowTimeSlotForm(true)} className="mt-4 flex items-center text-blue-600 hover:text-blue-900">
                    <HiOutlinePlus className="w-6 h-6 mr-1" /> Add New Time Slot
                </button>
            </div>

            {/* Stadium Update Form */}
            {showStadiumForm && (
                <div className="mb-8">
                    {/* Your stadium update form component */}
                </div>
            )}

            {/* Time Slot Add Form */}
            {showTimeSlotForm && (
                <div className="mb-8">
                    {/* Your time slot add form component */}
                </div>
            )}
        </div>
    );
};

export default Detail;

