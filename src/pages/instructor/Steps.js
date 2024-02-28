import {React,useEffect,useState} from 'react'
import { FaCheck } from "react-icons/fa";
import CourseInf from './CourseInf';
import CourseBuilder from './CourseBuilder';
import CoursePublish from './CoursePublish';

export default function Steps() {
 
    const steps = [
        {
            id: 1,
            title : "Course Information"
        },
        {
            id: 2,
            title : "Course Builder"
        },
        {
            id: 3,
            title : "Course Publish"
        }
    ]

    const [step, setstep] = useState(1);

    useEffect ( ()=>{
        setstep(1);
    },[]);

  return (
    <div>
        
    <div className='flex flex-row gap-64 ml-10 rounded-full mt-10'>
    {
        steps.map (  (ele,index)=>{
            return(
            <div className='flex flex-col gap-2'>
            
            <div key={index} className={`${step===ele.id  ? `text-yellow-5 shadow-sm shadow-yellow-25 border-yellow-5 border-2` : `border-richblack-500 text-richblack-500 border-2`}  text-white border-2 cursor-pointer bg-richblack-800 rounded-full flex w-9 h-9 justify-center items-center`}>
            {
                step > ele.id ?  (<div className='text-yellow-25'><FaCheck /></div>) : (ele.id)
            }  
            
            </div>

            <div className='text-white'>
                <p className='text-sm text-richblack-100 text-start'>{ele.title}</p>
            </div>

            </div>
            )
        })
    }
    </div>


    {/* <button className='bg-yellow-50 px-2 py-2 text-richblack-900 rounded-md'>Next</button> */}

    </div>
  )
}
