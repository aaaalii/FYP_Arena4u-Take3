import styles from './Home.module.css';
import { getStadiums } from '../../api/internal';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';


function Home() {

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
            <h1>Welcome to Arena4u</h1>
            <p>
                A perfect platform to book your ARENA... <br /><br /><br />              
                <h2>Stadiums:</h2><br />
            </p>
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

export default Home;