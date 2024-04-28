import React from 'react';
import { useNavigate } from "react-router-dom";


const Card = ({ stadium }) => {
    const navigate = useNavigate();
    const featureList = stadium.features.join(', ');

    return (
        <div className="w-full md:w-1/3 px-3 mb-6" key={stadium._id}>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-2">{stadium.name}</h2>
                <p className="text-gray-600 mb-2">{stadium.location}</p>
                <h2 className="card-text text-gray-600">Features: {featureList}</h2>
            
                <button
                    onClick={() => navigate(`/stadium/${stadium._id}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default Card;