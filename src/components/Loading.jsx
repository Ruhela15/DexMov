import React from 'react'
import Loader from '../../public/intersection.gif'
 const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className=' object-cover' src= {Loader}/>
    </div>
  )
}

export default Loading
