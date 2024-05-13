import React, { useState } from 'react';
import { registerStadium } from '../../api/internal';
import { useNavigate } from "react-router-dom";

function RegisterStadium() {

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    features: []
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await registerStadium(formData);
    if (response.status === 201) {
      navigate('/my-stadiums');
    }
    else if (response === 'ERR_BAD_REQUEST') {
      setError(response.response.data.message);
    }
  }

  const handleAddFeature = (e) => {
    e.preventDefault(); // Prevent form submission
    const newFeature = prompt('Enter a new feature:');
    if (newFeature) {
      setFormData({ ...formData, features: [...formData.features, newFeature] });
    }
  };

  return (
    <form className="max-w-md mx-auto mt-100"
      style={{ marginTop: '100px' }}
      onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          className="w-full px-3 py-2 border rounded-md text-bold"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Location:</label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          type="text"
          name="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleAddFeature}
      >
        Add Feature
      </button>
      {formData.features.map((feature, index) => (
        <div key={index} className="mb-2">{feature}</div>
      ))}

      <br />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterStadium;
