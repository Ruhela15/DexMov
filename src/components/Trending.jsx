import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partial/Topnav";
import Dropedown from "./partial/Dropedown";
import axios from "../utils/axios";
import Cards from "./partial/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const gettrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`, {
        params: { page }, // Pass the page number as a query parameter
      });
      if (data.results.length === 0) {
        setHasMore(false); // No more data to load
        return;
      }
      settrending((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.log("Data could not be fetched");
    }
  };

  // Fetch data on initial load and when category/duration changes
  useEffect(() => {
    settrending([]); // Reset trending data
    setpage(1); // Reset to the first page
    setHasMore(true); // Reset hasMore for new data set
    gettrending();
  }, [category, duration]);

  const fetchMoreData = () => {
    setpage((prevPage) => prevPage + 1); // Increment the page number
    gettrending(); // Fetch more data
  };

  return trending ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center mb-5 justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-white ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropedown
            title="category"
            options={["all", "movie", "Tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropedown
            title="duration"
            options={["day", "week"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={fetchMoreData} // Use the new fetchMoreData function
        hasMore={hasMore} // Pass the hasMore state
        loader={<Loading></Loading>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;

