import { getRandom } from "../../api/internal";
import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/StadiumCard/Card";

function Home() {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const response = await getRandom();
        setStadiums(response.data);
      } catch (error) {
        console.error("Error fetching stadiums:", error.message);
      }
    };

    fetchStadiums();
  }, []);

  if (stadiums.length === 0) {
    return <Loader text="stadiums" />;
  }

  return (
    <>
      <Hero />
      <br />
      <div className="mb-16">
        <h2 className="text-4xl text-center font-bold mt-20 mb-6">
          Featured Stadiums
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {stadiums.map((stadium, index) => (
            <div key={index} className="">
              <Card stadium={stadium} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
