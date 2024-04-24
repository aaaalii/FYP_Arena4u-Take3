import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";



const Hero = () => {
    const images = [
        "https://media.istockphoto.com/id/983979694/photo/corner-line-of-an-indoor-football-soccer-training-field.jpg?s=2048x2048&w=is&k=20&c=7CGWN6PHwa7CajuxY2tOje6rW4ezphC8XrarjimaX3Q=",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="h-screen flex items-center justify-center relative">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ images[currentImage]})` }}
            />
            <div className="z-10 text-center">
                <h1 className="text-4xl font-bold mb-4 text-white">
                    Welcome to our site!
                </h1>
                <p className="text-white mb-8">
                    Check out our latest <b>Stadium</b> and <b>services</b>.
                </p>
                <NavLink to= 'stadiums' className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-4 py-3 hoverBtn">
                    Check it <b>Now</b>
                </NavLink>
            </div>
            <div className="absolute bottom-0 left-0 right-0 mb-4">
                <div className="flex justify-center">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 m-1 rounded-full ${index === currentImage ? "bg-white" : "bg-gray-300"
                                }`}
                            onClick={() => setCurrentImage(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;