import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Notfound from '../Notfound';

const Trailer = () => {
    const {pathname} = useLocation();
     const navigate =  useNavigate()
    const category = pathname.includes("Movie")?"Movie":"Tv";
    const ytvideo = useSelector((state) => state[category].info.videos);
    console.log(ytvideo)
  return  (
    <div  className=' bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center '>
    <Link
              onClick={() => navigate(-1)}
            className="hover:text-red-500 ri-close-fill absolute cursor-pointer text-3xl text-white right-[5%] top-[5%] "
            ></Link>
            
      {ytvideo? (<ReactPlayer height={500} width={1000} url={`https://www.youtube.com/watch?v=${ytvideo?.key}`}/>):(<Notfound/>)}
    </div>
  )
}

export default Trailer
