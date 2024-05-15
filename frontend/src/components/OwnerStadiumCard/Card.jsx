import React from 'react';
import { useNavigate } from "react-router-dom";


const Card = ({ stadium }) => {
    const navigate = useNavigate();
    const featureList = stadium.features.join(', ');
    console.log(stadium._id);
    return (
        <div className="w-1/2 bg-white rounded-md shadow-md p-4">
            <h2 className="text-xl font-semibold">{stadium.name}</h2>
            <p className="text-gray-600 mb-2">{stadium.location}</p>
            <div className="mb-4">
                <p className="font-semibold mb-1">Features:</p>
                <ul className="list-disc ml-6">
                    {stadium.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={() => navigate(`/myStadium/${stadium._id}`)} 
            >
                Update
            </button>
        </div>
    );
};

export default Card;