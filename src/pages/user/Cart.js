import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart'
import { AppContext } from '../../context/Profile';
import { RiDeleteBin5Fill } from "react-icons/ri";
import  {buyCourse} from '../studentFeaturesAPI'
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const {cart,setcart} = useContext(CartContext);
  const {auth,setauth} = useContext(AppContext);

  function removeItem(id) {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      
      myCart.splice(index, 1);
      setcart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } 
    catch (error) {
      console.log(error);
    }
  }

  function totalPrice(){
    let total=0;
    cart.forEach(element => {
      total = total + element.price
      
    });
    return total;
  }

  const navigate = useNavigate();

  function handleBuy(){
    buyCourse([cart], auth, navigate);
    return;
  }

  return (
    <div className='flex flex-col  w-11/12 mt-7 ml-40'>
      <p className='font-semibold text-3xl text-richblack-5'>My Cart</p>

      <p className='text-richblack-300 mt-16 text-lg'>{cart.length} Courses in Cart.</p>
      <p className='w-[82%] h-[0.5px] bg-richblack-800 mt-1'></p>

      <div className='flex flex-row gap-6 mt-3'>
        {/* cart box */}
        <div className='flex flex-col gap-3 w-[47%] border-2 border-richblack-800 h-full'>
        {
          <div className='flex ml-2 flex-col gap-7 px-3 py-3 justify-evenly mt-1'>
          {
            cart.map ( (item)=>{
              return (
                <div key={item._id} className='flex flex-row gap-6'>

                 <div className='w-[15%]'>
                  <img src={item.thumbnail} alt="" className='w-20 h-16 rounded-lg'/>
                 </div>

                 <div className='flex flex-col gap-1 w-[50%]'>
                   <p className='text-richblack-5 text-xl font-semibold'>{item.courseName}</p>
                   <p className='text-richblack-100 text-sm'>{item.courseDescription}</p>
                 </div>


                 <div className='flex flex-col w-[15%] text-sm gap-2 text-white'>
                   <button className='bg-richblack-700 flex gap-2 items-center px-3 py-2 rounded-lg text-pink-200 hover:bg-richblack-800 transition-all duration-200' onClick={() => removeItem(item._id)}>Remove <RiDeleteBin5Fill /></button>
                   <p className='text-yellow-50 ml-2 font-semibold text-lg font-inter'>Rs. {item.price}/-</p>
                 </div>

                </div>
              )
            })
          }
          </div>
        }
        </div>

        {/* checkout div */}
        <div className='flex flex-col gap-1 px-3 py-3 w-[20%] border-2 border-richblack-800 h-40 bg-richblack-800'>
          <p className='text-richblack-300 mt-2'>Total : </p>
          <p className='text-yellow-50 font-semibold text-2xl'>Rs {totalPrice()}</p>
          <button className='bg-yellow-50 rounded-lg px-4 py-1 mt-4 hover:bg-yellow-200 border-b-[1px] border-white' onClick={handleBuy}>Buy Now</button>
        </div>


      </div>

    </div>
  )
}


