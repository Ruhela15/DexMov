import { useEffect, useState } from 'react';
import Sidenav from './partial/Sidenav';
import Topnav from './partial/Topnav';
import axios from '../utils/axios';
import Header from './partial/Header';
import HorizontalCards from './partial/HorizontalCards';
import Dropedown from './partial/Dropedown';
import Loading from '../components/Loading';
const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending ,settrending]  = useState(null);
  const [category ,setcategory] = useState("all");
  const getWallpaper = async () => {
    try {
      const {data}  = await axios.get(`/trending/all/day?language=en-US`);
      let randomdata = data.results[(Math.random()*data.results.length).toFixed()]
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error fetching wallpaper:", error);
    }
  };

  const gettrending  = async()=>{
    try{
      const {data} = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    }catch(error){
      console.log("data is not fetch")
    }
  };

  useEffect(() => {
    !wallpaper && getWallpaper();
      !trending && gettrending()
  }, [category]);

  return wallpaper && trending? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data = {wallpaper}/>
        <div className="mb-5 flex justify-between p-6">
        <h1 className="text-3xl font-semibold text-zinc-500">Trending</h1>
        <Dropedown title = "Filter" options ={["TV","MOVIE","ALL"]} func = {(e)=> setcategory(e.target.value)} />
      </div>
      
        <HorizontalCards data  = {trending}/>
      </div>
    </>
  ):(
  <Loading/>
  );
};

export default Home;



