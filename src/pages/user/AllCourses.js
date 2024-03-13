import React, { useContext,useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/Profile';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../../App.css'

export default function AllCourses() {

  const {auth,setauth} = useContext(AppContext);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const [courses, setcourses] = useState([]);


  useEffect( ()=>{

    const fetchData = async()=>{
      try{
  
        const { data } = await axios.post("/api/v1/course/getAllCourses");
  
        setcourses(data.allCourses);
        console.log(data.allCourses);
        console.log("courses",courses);
  
      }
      catch(err)
      {
        console.log(err.message);
      }
    }

    fetchData();
  },[courses]);


  function logoutfunction(e)
    {
    e.preventDefault();

    localStorage.removeItem("auth");
    setauth({
      ...auth,
      user:null,
      token:"",
    });
    toast.success("Logged out successfully");
    navigate("/");
  }

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100 relative ansh">

      {/* SideBar */}
      <nav className={`flex-shrink-0 min-h-screen  w-56 text px-4 py-2 bg-richblack-800 border-r border-gray-200 ${show===true ? "opacity-20" : ""}`}>
        
        <h1 className="text-2xl font-bold text-richblack-200">StudyNotion Dashboard</h1>
        <ul className="mt-4">

          <li className="mb-2">
            <Link to="/dashboard/my-profile" className="text-richblack-200 hover:text-richblack-25 text-lg">My Profile</Link>
          </li>

          <li className="mb-2">

            <Link to="/dashboard/enrolled-courses" className="text-richblack-200 hover:text-richblack-25 text-lg">Enrolled Courses</Link>
          </li>

          <li className="mb-2">
            <Link to="/dashboard/all-courses" className="text-richblack-200 hover:text-richblack-25 text-lg">All Courses</Link>
          </li>

          <div className='w-full mx-auto border-[1px] border-richblack-600 mt-3'> </div>

          <li className="mb-2 mt-3">
            <Link to="/dashboard/user-settings" className="text-richblack-200 hover:text-richblack-25 text-lg">Settings</Link>
          </li>

          <li className="mb-2">
            <Link to="" className="text-richblack-200 hover:text-richblack-25 text-lg" onClick={()=>setshow(true)}>Log Out</Link>
          </li>

          
        </ul>
      </nav>

      {/* All Courses Section */}
      <div className={`flex ml-32 w-[65%] flex-col gap-5 py-4 px-5 place-items-start ${show===true ? `opacity-20` : ``}`}>
        <p className='text-4xl text-richblack-25 hover:text-white mt-2'>All Courses</p>

        <div className="container mx-auto py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-9 -mt-6">
        {courses?.map((course) => (
          <div key={course._id} className="bg-richblack-800 rounded-md overflow-hidden shadow-md h-96 ">
            <img src={course.thumbnail} alt={course.courseName} className="w-full border-richblack-900 border-2 cursor-pointer h-48 object-fill"/>
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

          
    </div>

      {/* Log out tab */}
      <div className={`absolute left-[700px] h-44 mt-60 mx-auto w-80 bg-richblack-800 rounded-2xl flex flex-col py-4 px-4 ${show===true  ? `visible transition-all duration-100` : `invisible`}`}>

        <p className='text-richblack-5 text-2xl font-semibold'>Are You Sure ? </p>
        <p className='text-richblack-200 mt-2'>You will be logged out of your account.</p>

        <div className='flex flex-row gap-8 mt-6 w-[90%] mx-auto'>
          <button className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg px-3 py-3 border-b-[1px] border-white' onClick={logoutfunction}>Log Out</button>
          <button className='bg-richblack-700 text-white font-semibold rounded-lg px-5 py-2 border-b-[1px] border-white' onClick={()=>setshow(!show)}>Cancel</button>
        </div>

      </div>

    </div>

    
    </div>
  )
}
