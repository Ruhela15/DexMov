import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap justify-center w-full h-full px-[5%] bg-[#1F1E24]">
      {Object.values(data).map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="w-[220px] h-[400px] m-4 bg-[#1E1E1E] rounded-lg overflow-hidden shadow-xl group relative transition-all duration-500 transform hover:scale-105"
          key={i}
        >
          {/* Image Section with Glowing Effect */}
          <div className="relative w-full h-[70%] overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-t-lg transition-all duration-500 group-hover:opacity-80"
              src={`https://image.tmdb.org/t/p/original${
                c.poster_path || c.backdrop_path || ""
              }`}
              alt={c.name || c.title || "Movie Poster"}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000] opacity-50 group-hover:opacity-60 transition-all duration-300"></div>
          </div>

          {/* Title and Rating Section with Neon Effect */}
          <div className="p-4 h-[30%] bg-[#2A2A2A] rounded-b-lg">
            <h1 className="text-lg text-white font-semibold truncate">
              {c.name || c.title || c.original_name || c.original_title || "N/A"}
            </h1>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-400">
                {c.release_date?.slice(0, 4) || "N/A"}
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold py-1 px-3 text-xs rounded-full flex items-center shadow-lg group-hover:scale-110 transition-all duration-300">
                {(c.vote_average ? c.vote_average * 10 : 0).toFixed()}%
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
