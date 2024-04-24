import { getStadiums } from '../../api/internal';
import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';

function Stadiums(){
    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        const fetchStadiums = async () => {
            try {
                const response = await getStadiums();
                setStadiums(response.data);
            } catch (error) {
                console.error('Error fetching stadiums:', error.message);
            }
        };

        fetchStadiums();
    }, []);

    if (stadiums.length === 0) {
        return <Loader text="stadiums" />
    }


    return (
        <div>
            {stadiums.map((stadium) => (
                <div
                    id={stadium._id}
                >
                    <h1>{stadium.name}</h1>
                    <p>{stadium.location}</p><br />
                </div>
            ))}
        </div>
    );
}

export default Stadiums;