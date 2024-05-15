import { getStadiums } from "../../api/internal";
import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/StadiumCard/Card";
import styles from "./Stadiums.module.css";

function Stadiums() {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const response = await getStadiums();
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
    <div>
      <div style={{ marginTop: "100px" }}></div>
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {stadiums.map((stadium, index) => (
          <div key={index} className="">
            <Card stadium={stadium} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stadiums;
