import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const images = [
    "https://img.freepik.com/free-photo/green-grass-cinematic-lighting-football-stadium_1409-7657.jpg?t=st=1715819091~exp=1715822691~hmac=4c0dfa52eebe43973bae4aabc50e26cd1f4adaea8254b225ac2d2c0f161ba5a1&w=1060",
    "https://img.freepik.com/free-photo/american-football-field_23-2151117538.jpg?t=st=1715820290~exp=1715823890~hmac=2de96d3100b756533763939398a3022440d1421a183df64c37d3461bdc4aee0f&w=1380",
    "https://img.freepik.com/free-photo/american-football-field_23-2151117451.jpg?t=st=1715819900~exp=1715823500~hmac=96f1d01bad9195bd5fca1b6ac25fcc420ae7ac6b372feebce4d5425fc88726b3&w=1380",
    "https://img.freepik.com/free-photo/sport-football-arena-background_1409-5719.jpg?t=st=1715820180~exp=1715823780~hmac=403149c0bf5fef95637fdb4cd581c3b14686d5554e075a704858cd0afd18c08d&w=1060",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>

      <div className="z-10 text-center">
        <h1 className="text-6xl font-bold mb-4 text-white">
          Welcome to our site!
        </h1>
        <p className="text-white mb-8 text-lg">
          Check out our latest <b>Stadium</b> and <b>services</b>.
        </p>
        <NavLink
          to="stadiums"
          className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-4 py-3 hoverBtn hover:bg-slate-600 hover:outline-none hover:ring hover:ring-slate-500 hover:ring-opacity-75"
        >
          View <b>Stadiums</b>
        </NavLink>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mb-4">
        <div className="flex justify-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-3 h-3 m-1 rounded-full ${
                index === currentImage ? "bg-white" : "bg-gray-300"
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
