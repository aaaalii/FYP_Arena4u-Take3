import { getOwnerStadiums } from "../../api/internal";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import Card from "../../components/OwnerStadiumCard/Card";
import { useNavigate } from "react-router-dom";

function MyStadiums() {
  const [stadiums, setStadiums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stadiums by owner ID when the component mounts
    const fetchStadiums = async () => {
      try {
        // Assuming you have a function to get stadiums by owner ID from your API
        const response = await getOwnerStadiums(); // Replace ownerId with the actual owner ID
        setStadiums(response.data); // Assuming response.data contains an array of stadiums
      } catch (error) {
        console.error("Error fetching stadiums:", error);
      }
    };

    fetchStadiums();

    // Clean up function to clear the state when the component unmounts
    return () => {
      setStadiums([]);
    };
  }, []);

  if (stadiums.length === 0) {
    return (
      <div className="flex items-center justify-center mt-72 font-extrabold text-2xl text-center mb-24">
        <div>
          You have not registered any stadium.
          <br />
          <button
            onClick={() => navigate(`/register-stadium`)}
            className="text-cyan-700 underline"
          >
            Click here to register a stadium
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="container mx-auto px-4 mb-20">
        <h1 className="text-slate-800 font-extrabold text-3xl text-center pt-10 mb-10">
          My Stadiums
        </h1>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {stadiums.map((stadium, index) => (
            <div key={index} className="">
              <Card stadium={stadium} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyStadiums;
