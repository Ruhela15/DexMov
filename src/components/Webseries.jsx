import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../components/partial/Topnav";
import Cards from "../components/partial/Cards";
import Loading from "../components/Loading";

const Webseries = () => {
  const navigate = useNavigate();
  const [webseries, setWebseries] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("popular"); // Added filter state for web series

  const getWebseries = async () => {
    try {
      const { data } = await axios.get(`/tv/${filter}`, {
        params: { page }, // Pass the page number as a query parameter
      });

      if (data.results.length === 0) {
        setHasMore(false); // No more data to load
        return;
      }

      setWebseries((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.error("Data could not be fetched", error);
    }
  };

  useEffect(() => {
    setWebseries([]); // Reset web series data
    setPage(1); // Reset to the first page
    setHasMore(true); // Reset hasMore for new data set
    getWebseries();
  }, [filter]); // Refetch data when filter changes

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
    getWebseries(); // Fetch more data
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update the filter
  };

  return webseries.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center mb-5 justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-white ri-arrow-left-line cursor-pointer"
          ></i>
          Web Series
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          {/* Dropdown for Filter */}
          <select
            className="ml-5 p-2 bg-gray-800 text-white rounded-md"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="on_the_air">On The Air</option>
            <option value="airing_today">Airing Today</option>
          </select>
        </div>
      </div>

      <InfiniteScroll
        dataLength={webseries.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={webseries} title="webseries" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Webseries;

