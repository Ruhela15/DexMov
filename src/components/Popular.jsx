import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../components/partial/Topnav";
import Dropedown from "../components/partial/Dropedown";
import Cards from "../components/partial/Cards";
import Loading from "../components/Loading";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getpopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular`, {
        params: { page }, // Pass the page number as a query parameter
      });

      if (data.results.length === 0) {
        setHasMore(false); // No more data to load
        return;
      }

      setpopular((prevState) => [...prevState, ...data.results]);
    } catch (error) {
      console.error("Data could not be fetched", error);
    }
  };

  useEffect(() => {
    setpopular([]); // Reset popular data
    setpage(1); // Reset to the first page
    setHasMore(true); // Reset hasMore for new data set
    getpopular();
  }, [category]);

  const fetchMoreData = () => {
    setpage((prevPage) => prevPage + 1); // Increment the page number
    getpopular(); // Fetch more data
  };

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center mb-5 justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-white ri-arrow-left-line cursor-pointer"
          ></i>
          Popular
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropedown
            title="category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;



