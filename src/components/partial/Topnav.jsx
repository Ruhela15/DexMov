import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const Getsearches = async () => {
    if (!query.trim()) {
      setSearches([]);
      return;
    }

    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      Getsearches();
    }, 300); // Debounce API calls

    return () => clearTimeout(debounceTimeout); // Cleanup timeout on query change
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto   items-center ">
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] text-white mx-4 p-2 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search anything"
        aria-label="Search input"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-3xl text-zinc-300 ri-close-line cursor-pointer"
          aria-label="Clear search"
        ></i>
      )}
      {searches.length > 0 && (
        <div className="w-[50%] max-h-[50vh] top-[100%] left-[5%] bg-zinc-900 absolute rounded overflow-y-auto shadow-lg z-10">
          {searches.map((s, i) => (
            <Link
              key={i}
              to={`/${s.media_type}/details/${s.id}`}
              className="text-white font-semibold hover:text-red-600 hover:bg-zinc-900 w-full p-2 flex items-center border-b-2 border-zinc-100"
            >
              <img
                src={s.poster_path ? `https://image.tmdb.org/t/p/w200${s.poster_path}` : "/no-images.jpeg"}
                alt={s.title || s.name || "No title"}
                className="w-12 h-12 mr-4 object-cover rounded shadow-md"
              />
              <span className="truncate">{s.original_title || s.name || s.title || s.original_name || "Untitled"}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;


