import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ stadium }) => {
  const navigate = useNavigate();
  const featureList = stadium.features.join(", ");
  console.log(stadium._id);
  return (
    <div className="px-3 mt-10 mx-2 basis-1/3" key={stadium._id}>
      <div class="group overflow-hidden p-5 duration-1000 hover:duration-1000 relative h-1/2 bg-slate-800 rounded-xl">
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
        <div class="group-hover:rotate-45 bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
        <div class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
        <div class="w-full h-full p-3 bg-neutral-700 bg-opacity-50 rounded-xl flex-col gap-2 flex justify-center">
          <div className="text-opacity-100 z-10">
            <h2 class="text-neutral-50 font-bold text-xl italic ms-4 my-2">
              {stadium.name}
            </h2>
            <p className="text-white ms-4 my-1">{stadium.location}</p>
            <div className="mb-4">
              <p className="text-white ms-4 my-1">Features:</p>
              <ul className="list-disc ml-6 text-white ms-10 my-1 inline">
                {stadium.features.map((feature, index) => (
                  <li key={index} className="inline">
                    {feature}
                    {index !== stadium.features.length - 1 && (
                      <span className="mx-1">•</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate(`/myStadium/${stadium._id}`)}
              className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-3 py-1 hoverBtn my-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
