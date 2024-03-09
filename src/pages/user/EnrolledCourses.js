import React, { useContext,useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/Profile';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Line } from 'rc-progress';

export default function Profile() {

  const {auth,setauth} = useContext(AppContext);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const [courses, setcourses] = useState([]);
  const [course, setcourse] = useState('All');


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
      <div className="flex h-screen bg-gray-100 relative">

      {/* SideBar */}
      <nav className={`flex-shrink-0 w-56 text px-4 py-2 bg-richblack-800 border-r border-gray-200 ${show===true ? "opacity-20" : ""}`}>
        
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

      {/* My Profile Section */}
      <div className={`flex ml-32 w-[60%] flex-col gap-5 py-4 px-5 place-items-start ${show===true ? `opacity-20` : ``}`}>
        <p className='text-3xl text-richblack-25 hover:text-white'>Enrolled Courses</p>
        
        <div className={`flex flex-row gap-6 cursor-pointer bg-richblack-800  px-5 py-2 rounded-full`}>
          <p className={`${course==='All' ? `text-white` : `text-richblack-200`}`} onClick={()=>{setcourse('All')}}>All</p>
          <p className={`${course==='Pending' ? `text-white` : `text-richblack-200`}`} onClick={()=>{setcourse('Pending')}}>Pending</p>
          <p className={`${course==='Completed' ? `text-white` : `text-richblack-200`}`} onClick={()=>{setcourse('Completed')}}>Completed</p>
        </div>


        <div className='bg-richblack-700 w-full h-12 rounded-xl mt-6'>
          <div className='text-richblack-100 flex flex-row gap-3 justify-between px-2 py-1 items-center mt-2 font-medium'>
            <p className='mr-3'>Course Name</p>
            <p className=''>Duration</p>
            <p className=''>Progress</p>
            <p className='mr-6'>Actions</p>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
        {
        courses?.map((course, index) => (
         <div key={index} className='text-white h-auto w-full flex flex-row items-center px-2'>

           <div className='flex gap-3 w-[50%]'>
            <img src={course.thumbnail} alt="" className='h-9 w-10 rounded-xl object-contain'/>
             <div className='flex flex-col text-sm'>
              <p className='font-semibold'>{course.courseName}</p>
              <p className='text-xs text-richblack-300'>{course.whatwillyoulearn}</p>
             </div>
           </div>

           <div className='text-richblack-300 ml-20 items-start w-[20%]'>
            2hr 30mins
           </div>
 
           <div className=' w-[20%] ml-40 flex items-center' >
           <Line percent={60} strokeWidth={7} strokeColor="#D3D3D3" />
           </div>

           <div>
           <div className="w-[10%] ml-44 h-8 rounded-full bg-gray-300 flex flex-col gap-1 cursor-pointer items-center justify-center">
            {/* Three dots icon */}
            <div className="w-1 h-1 bg-richblack-300 rounded-full"></div>
            <div className="w-1 h-1 bg-richblack-300 rounded-full mx-1"></div>
            <div className="w-1 h-1 bg-richblack-300 rounded-full"></div>
          </div>
           </div>

          </div>
        ))
        }
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







