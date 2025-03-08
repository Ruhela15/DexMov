import React from "react";
import { Link } from "react-router-dom";
import Dropedown from "../partial/Dropedown";
const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full flex overflow-x-auto space-x-5 mb-5 ">
      {data.map((d, i) => (
        <Link 
          to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="flex-shrink-0 w-60 bg-zinc-900 rounded-lg shadow-md overflow-hidden"
        >
          <img
            className="w-full h-36 object-cover"
            src={`https://image.tmdb.org/t/p/original${
              d.backdrop_path || d.poster_path
            }`}
            alt=""
          />
          <div className="text-white p-3">
            <h1 className="font-semibold text-lg truncate">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="text-sm mt-2">
              {d?.overview.slice(0, 50)}....
              <Link className="text-blue-400">more</Link>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
