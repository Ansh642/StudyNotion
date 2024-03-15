import React from 'react'
import image1 from '../assets/Images/aboutus1.webp'
import image2 from '../assets/Images/aboutus2.webp'
import image3 from '../assets/Images/aboutus3.webp'
import image4 from '../assets/Images/FoundingStory.png'
import Review from './Review';
import Footer from '../components/Footer'

export default function About() {
  return (

    <div className=' text-white h-full w-full'>
      {/* section 1  */}

      <div className='bg-richblack-800 h-[600px] w-full'>

         <div className='w-[70%] flex flex-col  items-center mx-auto justify-center'>
            <p className='text-richblack-5 mt-32 w-[60%] text-3xl font-inter font-semibold'>Driving Innovative in Online Education For a <span className='text-blue-200 mx-auto ml-48'>Brighter future.</span></p>
            <p className='w-[75%] mx-auto mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet. Quam quidem Lorem, ipsum. </p>
            <span className='w-[75%] text-center'> molestiae optio dicta necessitatibus minus, quos quod iure et labore architecto accusantium fuga ea voluptate,</span>
            <p className='text-center'>Lorem, ipsum dolor.</p>
         </div>

         <div className=' flex flex-row gap-7 w-11/12 mt-10 items-center justify-center'>
            <img src={image1} alt="" className='absolute left-28 -bottom-4'/>
            <img src={image2} alt="" className='absolute right-[570px] -bottom-4 shadow-lg shadow-yellow-100'/>
            <img src={image3} alt="" className='absolute right-32 -bottom-4'/>
         </div>

      </div>
 
      {/* section 2 */}
      <div className='bg-richblack-900 mx-auto mt-44'>

        <div className='flex flex-col gap-1 w-[80%] mx-auto'>
          <p className=' mx-auto text-3xl font-inter font-semibold'>"We are passionate about revolutionizing the way we learn. Our </p>
          <p className=' mx-auto text-3xl font-inter font-semibold'>innovative platform <span className='text-blue-200'>combines technology</span>, <span className='text-yellow-400'>expertise</span>, and community to </p>
          <p className='text-center text-3xl font-inter font-semibold'>create an <span className='text-yellow-100'>unparalleled educational experience</span>."</p>
        </div>

        <div className='h-[0.1px] w-full mt-24 border-richblack-700 border-[1px]'></div>

        <div className='flex flex-row items-center justify-center mt-20 gap-32 w-[90%] ml-28  mx-auto'>

            <div className='flex flex-col w-[37%]'>
              <p className='text-3xl text-brown-500 font-semibold'>Our Founding Story</p>
              <p className='mt-7 text-richblack-50'>Our e-learning platform was born out of a shared vision andpassion for transforming education. It all began with a group ofeducators, technologists, and lifelong learners who recognizedthe need for accessible, flexible, and high-quality learningopportunities in a rapidly evolving digital world.</p>
              <p className='mt-3 text-richblack-50'> As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>

            <div className='w-[40%]'>
              <img src={image4} alt="" />
            </div>

        </div>


        <div className='flex gap-28 justify-center items-center mx-auto w-[80%] mt-32 mb-16'>

          <div className='flex flex-col gap-4 w-[40%]'>
            <p className='text-3xl font-semibold font-inter text-yellow-200'>Our Vision</p>
            <p className='text-richblack-50'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.Our team of dedicated experts worked tirelessly to develop arobust and intuitive platform that combines cutting-edgetechnology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>

          <div className='flex flex-col gap-4 w-[40%]'>
            <p className='text-3xl font-semibold font-inter text-blue-200'>Our Mission</p>
            <p className='text-richblack-50'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.Our team of dedicated experts worked tirelessly to develop arobust and intuitive platform that combines cutting-edgetechnology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>

        </div>

        <div className='bg-richblack-800 h-[180px] mt-28 w-full mb-10'>
          <div className='flex flex-row justify-evenly items-center'>

            <div className='mt-14'>
              <p className='text-3xl font-inter font-semibold'>5K</p>
              <p className='text-richblack-300'>Active Students</p>
            </div>

            <div className='mt-14'>
              <p className='text-3xl font-inter font-semibold'>10+</p>
              <p className='text-richblack-300'>Mentors</p>
            </div>

            <div className='mt-14'>
              <p className='text-3xl font-inter font-semibold'>200+</p>
              <p className='text-richblack-300'>Courses</p>
            </div>

            <div className='mt-14'>
              <p className='text-3xl font-inter font-semibold'>50+</p>
              <p className='text-richblack-300'>Awards</p>
            </div>

          </div>
        </div>

      </div>

      {/* section 3 */}
      {/* <ContactForm/> */}

      {/* section 4 */}
      <div className='flex flex-col w-11/12 gap-5 mt-20'>
        <p className='text-3xl text-richblack-5 font-semibold mx-auto'>Review from other Learners</p>

        <Review/>
      </div>

      <Footer/>

    </div>
  )
}




