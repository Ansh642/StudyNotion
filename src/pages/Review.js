import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import '../App.css';

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://studynotion-2-qsjg.onrender.com/api/v1/course/getReviews');
        if (response.data.success) {
          setReviews(response.data.allRating);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchReviews();
  }, []);

  const nextSlide = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 4, reviews.length - 1));
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  return (
    <div className='mx-auto w-[95%] mr-2 items-center justify-center mt-6 mb-10'>

      <div className='slider-container flex items-center justify-center'>
        <button onClick={prevSlide} className='prev-button mr-7 '>&#10094;</button>

        <div className='slider grid grid-cols-4 gap-8'>
          {reviews.slice(startIndex, startIndex + 4).map((review, index) => (
            <div key={index} className='slide'>

              <div className='bg-richblack-800 h-52 w-60 px-3 py-4 rounded-lg flex flex-col gap-4'>

                <div className='flex flex-row gap-2 h-10 items-center'>
                  <img src={review.user.image} alt='' className='w-9 h-9 rounded-full' />

                  <div className='flex flex-col'>
                    <p className='text-richblack-100'>{review.user.firstName} {review.user.lastName}</p>
                    <p className='text-richblack-500 text-sm'>{review.user.email}</p>
                  </div>

                </div>

                <div className='text-richblack-300 h-32'>
                  {review.review}
                </div>

                <div>
                  <ReactStars count={review.rating} size={30} className='h-10' color1={'#FFE83D'} />
                </div>
              </div>

            </div>
          ))}
        </div>

        <button onClick={nextSlide} className='next-button ml-7'>&#10095;</button>
      </div>
    </div>
  );
}
