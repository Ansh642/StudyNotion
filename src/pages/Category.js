import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Category() {

    const location = useLocation();
    const decodedString  = location.pathname.split('/');
    const name = decodeURIComponent(decodedString).slice(1,);

    const [courses, setcourses] = useState([]);
    const [otherCourses, setotherCourses] = useState([]);

    const courseArray = [courses];

    useEffect( ()=>{
        const fetchCourses=async()=>{
            try{
              const response  = await axios.post('/api/v1/course/getCategoryPageDetails',{
                name
              });

              if(response.data.success){
                setcourses(response.data.allCourse);
                setotherCourses(response.data.otherCourses);
              }
              else{
                toast.error("Error in fetching courses");
              }
            }
            catch(err){
                console.log(err.message);
                toast.error(err.message);
            }
        }

     fetchCourses();
    },[name]);

  return (

    <div className='flex flex-col gap-8'>

    <div className='bg-richblack-800 h-48 w-full text-richblack-5 '>
        <p className='ml-16 mt-8 text-4xl '>{name}</p>
        <p className='ml-16 text-richblack-100 w-[85%] mt-1'>{name} is a high-level, interpreted programming language known for its simplicity and readability. It offers dynamic typing and automatic memory management, making it ideal for rapid application development and scripting. Python's extensive standard library and thriving community contribute to its versatility and popularity in various domains, including web development.</p>
    </div>

    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-inter mb-4 flex items-center justify-start text-richblack-5">Courses related to {name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {courseArray?.map((course) => (
          <div key={course._id} className="bg-richblack-800 rounded-md overflow-hidden shadow-md h-96 hover:scale-105 hover:transition-all duration-200">
            <img src={course.thumbnail} className="w-full border-richblack-900 border-2 cursor-pointer h-48 object-contain"/>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-white">{course.courseName}</h3>
              <p className="text-richblack-100 text-sm h-14">{course.courseDescription}</p>
              <div className="mt-7 flex justify-between items-center">
                <span className=" font-semibold text-white">Rs. {course.price} /-</span>
                
                <button 
                 className="bg-blue-500 place-content-end text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-inter mb-4 flex items-center justify-start text-richblack-5">Other Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {otherCourses?.map((course) => (
          <div key={course._id} className="bg-richblack-800 rounded-md overflow-hidden shadow-md h-96 hover:scale-105 hover:transition-all duration-200">
            <img src={course.thumbnail} className="w-full border-richblack-900 border-2 cursor-pointer h-48 object-contain"/>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-white">{course.courseName}</h3>
              <p className="text-richblack-100 text-sm h-14">{course.courseDescription}</p>
              <div className="mt-7 flex justify-between items-center">
                <span className=" font-semibold text-white">Rs. {course.price} /-</span>
                
                <button 
                 className="bg-blue-500 place-content-end text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <Footer/>


    </div>
  )
}