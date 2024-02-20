import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart'

export default function Cart() {

  const {cart,setcart} = useContext(CartContext);

  return (
    <div className='flex flex-col  w-11/12 mt-7 ml-40'>
      <p className='font-semibold text-3xl text-richblack-5'>My Cart</p>

      <p className='text-richblack-300 mt-16 text-lg'>3 Courses in Cart.</p>
      <p className='w-[82%] h-[0.5px] bg-richblack-800 mt-1'></p>

      <div className='flex flex-row gap-6 mt-5'>
        {/* cart box */}
        <div className='flex flex-col gap-3 w-[60%] border-2 border-richblack-800 h-72'>

        </div>

        {/* checkout div */}
        <div className='flex flex-col gap-1 px-3 py-3 w-[20%] border-2 border-richblack-800 h-40 bg-richblack-800'>
          <p className='text-richblack-300 mt-2'>Total : </p>
          <p className='text-yellow-50 font-semibold text-2xl'>Rs 2500</p>
          <button className='bg-yellow-50 rounded-lg px-4 py-1 mt-4 hover:bg-yellow-200 border-b-[1px] border-white'>Buy Now</button>
        </div>


      </div>

    </div>
  )
}


