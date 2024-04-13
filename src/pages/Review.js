import axios from 'axios';
import React, { useEffect,useState } from 'react'
import ReactStars from 'react-stars'
import '../App.css'

export default function Review() {

  const [reviews, setreviews] = useState([]);

  useEffect( ()=>{

   const fetchReviews =async()=>{
      try{
        const response = await axios.get('https://studynotion-2-qsjg.onrender.com/api/v1/course/getReviews');

        if(response.data.success)
        {
          setreviews(response.data.allRating);
        }

      }
      catch(err){
        console.log(err.message);
      }
    }

    fetchReviews();
  },[]);
  return (
    <div className='w-11/12 flex flex-row gap-10 mx-auto items-center justify-center mt-4 mb-6'>
      {
        reviews.map ( (review,index)=>{
          return (
            <div key={index}>
             <div className='bg-richblack-800 w-60 px-3 py-3 rounded-lg h-52 flex flex-col gap-2'>

                <div className='flex flex-row gap-2 items-center h-[30%]'>
                  <img src={review.user.image} alt="" className='w-9 h-9 rounded-full' />
                  <div className='flex flex-col'>
                    <p className='text-richblack-100'>{review.user.firstName} {review.user.lastName}</p>
                    <p className='text-richblack-500 text-sm'>{review.user.email}</p>
                  </div>
                </div>


                <div className='text-richblack-300 w-[97%] h-[50%]'>
                  {review.review}
                </div>

                <div className='h-[20%]'>
                  <ReactStars count={review.rating} size={30} color1={'#FFE83D'} />
                </div>

              </div>
            </div>
          )
        })
      }
    </div>

    
    
  )
}
