import { getRandom } from '../../api/internal';
import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import Hero from '../../components/Hero/Hero';
import Card from '../../components/StadiumCard/Card';

function Home() {
    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        const fetchStadiums = async () => {
            try {
                const response = await getRandom();
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
        <>
            <Hero />
            <br />
            <h2 className="text-4xl text-center font-bold mb-8">Featured Stadiums</h2>
            <div className="flex flex-wrap -mx-3">
                {stadiums.map((stadium) => (
                    <Card stadium={stadium} />
                ))}
            </div>
        </>
    );
}

export default Home;