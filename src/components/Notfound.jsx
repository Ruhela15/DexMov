import React from 'react'
import not from '../../public/not.jpg'
 const Notfound = () => {
  return (
    <div className='h-[25vh] w-[25vh] flex justify-center items-center bg-black'>
      <img className=' object-cover' src= {not}/>
    </div>
  )
}

export default Notfound
