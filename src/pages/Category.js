import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../context/Cart';


export default function Category() {

    const location = useLocation();
    const decodedString  = location.pathname.split('/');
    const name = decodeURIComponent(decodedString).slice(1,);

    const [courses, setcourses] = useState([]);
    const [otherCourses, setotherCourses] = useState([]);
    const {setcart} = useContext(CartContext);

    const courseArray = [courses];

    useEffect( ()=>{
        const fetchCourses=async()=>{
            try{
              const response  = await axios.post('https://studynotion-2-qsjg.onrender.com/api/v1/course/getCategoryPageDetails',{
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

    <div className="container mx-auto py-8 ">
      <h2 className="text-3xl font-inter mb-4 flex items-center justify-start text-richblack-5">Courses related to {name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {courseArray?.map((course) => (
          <div key={course._id} className="bg-richblack-800 rounded-md overflow-hidden shadow-md h-96 ">
            <img src={course.thumbnail} alt={course.courseName} className="w-full border-richblack-900 border-2 cursor-pointer h-48 object-fill"/>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-white">{course.courseName}</h3>
              <p className="text-richblack-100 text-sm h-14">{course.courseDescription}</p>
              <div className="mt-7 flex justify-between items-center">
                <span className=" font-semibold text-white">Rs. {course.price} /-</span>
                
                <button 
                 className="bg-blue-400 place-content-end text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-all duration-200"
                 onClick={() => {
                  setcart(prevCart => {
                    // Parse existing cart items from localStorage or initialize as an empty array
                    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
                    // Add the new course to the existing cart items
                    const updatedCart = [...existingCart, course];
                    // Update localStorage with the updated cart items
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    // Update state with the updated cart items
                    toast.success("Product Added Successfully");
                    return updatedCart;
                  });
                }}
                
                  >
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6">
        {otherCourses?.map((course) => (
          <div key={course._id} className="bg-richblack-800 rounded-md overflow-hidden shadow-md h-96 ">
            <img src={course.thumbnail} alt={course.courseName} className="w-full border-richblack-900 border-2 cursor-pointer h-48 object-fill"/>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-white">{course.courseName}</h3>
              <p className="text-richblack-100 text-sm h-14">{course.courseDescription}</p>
              <div className="mt-7 flex justify-between items-center">
                <span className=" font-semibold text-white">Rs. {course.price} /-</span>
                
                <button 
                 className="bg-blue-400 place-content-end text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-all duration-200"
                 onClick={() => {
                  setcart(prevCart => {
                    const updatedCart = [...prevCart, course];
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                    toast.success("Product Added Successfully");
                    return updatedCart;
                  });
                }}>

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