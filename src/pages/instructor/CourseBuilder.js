import {React,useContext} from 'react'
import { BsLightningFill } from "react-icons/bs";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { CourseContext } from '../../context/Course';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
export default function CourseBuilder() {
    
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm();

  const navigate = useNavigate();
  
  const {course,setcourse} = useContext(CourseContext);
  
  const courseId = course?.courseDetails?._id;

  const handler= async(data)=>{

    const form = new FormData();
    form.append('sectionName',data.sectionName);

    try{
      const response = await axios.post('/api/v1/course/addSection',{
      sectionName: data.sectionName,
      courseId,
    });
  
      if(response.data.success)
      {
        // we have to save course details in course context
        toast.success("Section details saved successfully.");
        setcourse({
          sectionDetails:data,
        });
        console.log(course);
        localStorage.setItem("sectionDetails",JSON.stringify(response.data.newSection));
        reset();
        navigate('/dashboard/new-course-final')
      }
      else
      {
        toast.error('Error in creating course');
      }
    }
    catch(e){
      toast.error(e.message);
      console.log(e.message);
    }
  }

  return (
    <div>

    <div className=' flex gap-4 justify-center bg-richblack-900 mb-20 h-screen overflow-y-scroll'>

    {/* form div */}
    <div className='w-[50%] h-72 flex flex-col gap-2'>
      <p className='text-3xl text-white mt-4'>Add More Details</p>

      {/* Form div */}
      <form className=' bg-richblack-800 py-5 px-4 flex flex-col rounded-md gap-7 mt-4' onSubmit={handleSubmit(handler)}>

        <div className='flex flex-col gap-1 text-richblack-5'>
          <label className='ml-1'>Section Name<sup className='text-brown-400'>*</sup></label>
          <input type="text" {...register('sectionName', { required: true })} className='px-3 outline-none py-2 bg-richblack-600 rounded-lg ' placeholder='Enter Section Name'/>
          {
           errors.sectionName && <span>Section Name is required</span>
          }
        </div>

        {/* both buttons */}
      <div className='justify-end flex flex-row gap-5'>

      <button type='sumbit' className='bg-yellow-50 hover:scale-105 transition-all duration-200 rounded-lg px-4 py-2 border-b-[1px] border-white'>Save Changes and Proceed</button>

      </div>

      </form>

    </div>

    {/* box div */}
    <div className='w-[24%] h-80 rounded-lg bg-richblack-800 py-4 px-2 mt-6 text-white'>

      <div className='text-xl font-inter flex gap-1'>
        <p className='flex items-center text-yellow-5'><BsLightningFill /></p>
        <p>Course Upload Tips</p>
      </div>

      <div className='text-richblack-100 gap-1'>
        <div className='mt-2'>• Set the Course Price option or make it free.</div>
        <div>• Standard size for the course thumbnail is 1024x576.</div>
        <div>• Video section controls the course overview video.</div>
        <div>• Course Builder is where you create & organize a course.</div>
        <div>• Set the Course Price option or make it free.</div>
        <div>• Standard size for the course thumbnail is 1024x576.</div>
      </div>

    </div>


    </div>
 
    
    </div>
  )
}


