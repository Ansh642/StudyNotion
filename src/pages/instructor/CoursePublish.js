import {React,useContext} from 'react'
import { BsLightningFill } from "react-icons/bs";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { CourseContext } from '../../context/Course';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
export default function CoursePublish() {
    
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm();

  const navigate = useNavigate();

  const {course} = useContext(CourseContext);

  const sectionId = course?.sectionDetails?._id;

  const handler= async(data)=>{

    const form = new FormData();
    form.append('title',data.title);
    form.append('description',data.description);
    form.append('videoUrl',data.videoUrl[0]);

    try{
      const response = await axios.post('/api/v1/course/addSubSection', {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl[0],
        sectionId
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.data.success)
      {
        toast.success("Course Published successfully.");
        reset();
        navigate('/dashboard/my-courses');
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
      <p className='text-3xl text-white mt-4'>Add Final Details</p>

      {/* Form div */}
      <form className=' bg-richblack-800 py-5 px-4 flex flex-col rounded-md gap-7 mt-4' onSubmit={handleSubmit(handler)}>

        <div className='flex flex-col text-richblack-5'>
          <label className='ml-1'>Lecture Title<sup className='text-brown-400'>*</sup></label>
          <input type="text" {...register('title', { required: true })} className='px-3 outline-none py-2 bg-richblack-600 rounded-lg ' placeholder='Enter Lecture Title'/>
          {
           errors.title && <span>Lecture Title is required</span>
          }
        </div>
        
        <div className='flex flex-col text-richblack-5'>
          <label className='ml-1'>Lecture Description<sup className='text-brown-400'>*</sup></label>
          <textarea rows={5} cols={5} {...register('description')} className='px-3 outline-none py-2 bg-richblack-600 rounded-lg ' placeholder='Enter Lecture Description'/>
          {
           errors.description && <span>Lecture Description is required</span>
          }
        </div>

        <div className='flex flex-col text-richblack-5'>
          <label className='ml-1'>Lecture Video<sup className='text-brown-400'>*</sup></label>
          <input type='file' {...register('videoUrl', { required: true })} className='px-3 outline-none py-2 bg-richblack-600 rounded-lg ' placeholder='Enter Price'/>
          {
           errors.videoUrl && <span>Video Url is required</span>
          }
        </div>

        {/* both buttons */}
      <div className='justify-end flex flex-row gap-5'>

      <button type='sumbit' className='bg-yellow-50 hover:scale-105 transition-all duration-200 rounded-lg px-4 py-2 border-b-[1px] border-white'>Publish Course</button>

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
