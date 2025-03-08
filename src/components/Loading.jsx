import React from 'react'
// import Loader from '../../public/intersection.gif'
 const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      {/* <img className='object-cover' src= {Loader}/> */}
      <h1 className="text-3xl text-white font-semibold">Loading...</h1>
    </div>
  )
}

export default Loading
