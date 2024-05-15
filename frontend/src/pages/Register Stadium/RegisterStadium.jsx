import React, { useState } from "react";
import { registerStadium } from "../../api/internal";
import { useNavigate } from "react-router-dom";

function RegisterStadium() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    features: [],
  });

  const handleFormSubmit = async e => {
    e.preventDefault();

    const response = await registerStadium(formData);
    if (response.status === 201) {
      navigate("/my-stadiums");
    } else if (response === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const handleAddFeature = e => {
    e.preventDefault(); // Prevent form submission
    const newFeature = prompt("Enter a new feature:");
    if (newFeature) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature],
      });
    }
  };

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-slate-800 font-extrabold text-3xl text-center pt-10 mb-10">
        Register Stadium
      </h1>
      <form
        className="max-w-md mx-auto mb-40 flex flex-col w-96 items-center justify-center"
        style={{ marginTop: "50px" }}
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4 w-full">
          <label className="block mb-2">Name:</label>
          <input
            className="w-full px-3 py-2 border rounded-md text-bold"
            type="text"
            name="name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2">Location:</label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="location"
            value={formData.location}
            onChange={e =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div className="flex gap-6">
          {formData.features.map((feature, index) => (
            <div key={index} className="mb-2">
              {feature}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddFeature}
          className="rounded-full border border-solid border-primary bg-transparent text-lg text-black px-8 py-3 hoverBtn my-4"
        >
          Add Feature
        </button>

        <button
          type="submit"
          className="rounded-full border border-solid border-primary bg-transparent text-lg text-black px-8 py-3 hoverBtn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterStadium;
