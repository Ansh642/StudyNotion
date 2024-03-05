import {React,useContext,useEffect,useState} from 'react'
import { BsLightningFill } from "react-icons/bs";
import Steps from './Steps';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import ContactForm from '../ContactForm';
import { CourseContext } from '../../context/Course';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
export default function CourseInf() {
    
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful}
  } = useForm();

  const navigate = useNavigate();

  const [categories, setcategories] = useState([]);
  const {course,setcourse} = useContext(CourseContext);

  useEffect(() => {
    const fetchCategories =async()=>{
      try{
        const { data } = await axios.get("/api/v1/course/showAllCategories");
        //console.log(data.allCategory);
        setcategories(data.allCategory);
      
      }
      catch(err){
        console.log(err.message);
        
      }
    }

    fetchCategories();
  }, []);
  

  const handler= async(data)=>{

    //console.log(data);
    const form = new FormData();
    form.append('courseName',data.courseName);
    form.append('courseDescription',data.courseDescription);
    form.append('whatwillyoulearn',data.whatwillyoulearn);
    form.append('price',data.price);
    form.append('category',data.category);
    form.append('image',data.image[0]);

    try{
      const response = await axios.post('/api/v1/course/createCourse', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.data.success)
      {
        // we have to save course details in course context
        toast.success("Course details saved successfully.");
        setcourse({
          courseDetails:data,
        });
        //console.log(course);
        localStorage.setItem("courseDetails",JSON.stringify(response.data.newCourse));
        reset();
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

  function resetForm()
  {
    reset();
  }

  return (
    <div>

    <div className=' flex gap-4 justify-center bg-richblack-900 mb-20 h-screen overflow-y-scroll'>

    {/* form div */}
    <div className='w-[60%] h-72 flex flex-col gap-2'>
      <p className='text-3xl text-white mt-4'>Add More Details</p>

      {/* Form div */}
      <form className=' bg-richblack-800 py-5 px-4 flex flex-col rounded-md gap-7 mt-4'>

        <div className='flex flex-col text-richblack-5'>
          <label className='ml-1'>Course Title<sup className='text-brown-400'>*</sup></label>
          <input type="text" {...register('courseName', { required: true })} className='px-3 outline-none py-2 bg-richblack-600 rounded-lg ' placeholder='Enter Course Title'/>
          {
           errors.courseTitle && <span>Course Title is required</span>
          }
        </div>

        <div className='flex flex-col text-richblack-5'>
          <label className='ml-1'>Course Description<sup className='text-brown-400'>*</sup></label>
          <textarea rows={5} cols={5} {...register('courseDescription')} className='px-3 outline-none py-2 bg-richblack-600 rounded-lg ' placeholder='Enter Course Description'/>
          {
           errors.courseDescription && <span>Course Description is required</span>
          }
        </div>

        <div className='flex flex-col text-richblack-5'>
          <label className='ml-1'>Price<sup className='text-brown-400'>*</sup></label>
          <input type="text" {...register('price', { required: true })} className='px-3 outline-none py-2 bg-richblack-600 rounded-lg ' placeholder='Enter Price'/>
          {
           errors.price && <span>Price is required</span>
          }
        </div>



        {/* both buttons */}
      <div className='justify-end flex flex-row gap-5'>

      <button className='bg-richblack-700 hover:scale-105 transition-all duration-200 text-white font-medium rounded-lg px-5 py-2 border-b-[1px] border-white'
       onClick={resetForm}>Clear Form</button>

      <button type='sumbit' className='bg-yellow-50 hover:scale-105 transition-all duration-200 rounded-lg px-5 py-2 border-b-[1px] border-white'
       onClick={()=>navigate('/dashboard/new-course-continue')}>Save Changes and Proceed</button>

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


