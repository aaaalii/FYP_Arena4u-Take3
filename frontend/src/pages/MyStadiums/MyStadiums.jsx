import { getOwnerStadiums } from "../../api/internal";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import Card from "../../components/OwnerStadiumCard/Card";

function MyStadiums() {

    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        // Fetch stadiums by owner ID when the component mounts
        const fetchStadiums = async () => {
            try {
                // Assuming you have a function to get stadiums by owner ID from your API
                const response = await getOwnerStadiums(); // Replace ownerId with the actual owner ID
                setStadiums(response.data); // Assuming response.data contains an array of stadiums
            } catch (error) {
                console.error('Error fetching stadiums:', error);
            }
        };

        fetchStadiums();

        // Clean up function to clear the state when the component unmounts
        return () => {
            setStadiums([]);
        };
    }, []);

    if (stadiums.length === 0) {
        return <Loader text="stadiums" />
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Stadiums</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stadiums.map(stadium => (
                        <Card stadium={stadium}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyStadiums;