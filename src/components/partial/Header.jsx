import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top 15px ",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[60vh] flex flex-col items-start justify-end p-[5%]"
    >
      <h1 className= "text-zinc-200 w-[70%] text-5xl font-black">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
         
          <p className="w-[70%] mt-3 mb-3 text-white">{data.overview.slice(0,200)}....<Link  to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link></p>
      <p className="text-white gap-x-2 ">
    <i classname="ri-megaphone-fill text-yellow-500 "></i>{data.vote_average.toFixed(1)}
      <i classname="ri-movie-2-line ml-5 text-yellow-500"></i>{data.media_type.toUpperCase()}
      </p>
      <Link className="p-3 rounded text-white font-semibold mt-5 bg-blue-400">Watch triler</Link>
    </div>
  );
};

export default Header;
