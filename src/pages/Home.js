import {React,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import video from '../assets/Images/banner.mp4'
import { TypeAnimation } from 'react-type-animation'
import { IoPeople } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import logo1 from '../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../assets/TimeLineLogo/Logo4.svg'
import Timelineimage from '../assets/Images/TimelineImage.png'
import image1 from '../assets/Images/Know_your_progress.png'
import image2 from '../assets/Images/Plan_your_lessons.png'
import instructor from '../assets/Images/Instructor.png'
import image3 from '../assets/Images/Compare_with_others.png'
import '../App.css'
import Footer from '../components/Footer';
import { HomePageExplore } from '../data/homepage-explore';

const timeline=[
    {
      logo : logo1,
      heading: "Leadership",
      description: "Fully commited to success company",
    },
    {
      logo : logo2,
      heading: "Responsibility",
      description: "Fully commited to success company",
    },
    {
      logo : logo3,
      heading: "Flexibility",
      description: "Fully commited to success company",
    },
    {
      logo : logo4,
      heading: "Solve the Problem",
      description: "Fully commited to success company",
    }
]


export default function Home() {

  const [course, setcourse] = useState('Free');
  const [courses, setcourses] = useState(HomePageExplore[0].courses);

  const navigate = useNavigate();

  function handler (value)
  {
    const result = HomePageExplore.filter ( (e) => e.tag === value);
    setcourses(result[0].courses);
  }

  return (
    <div>
        {/* section 1  */}
        <div className='flex relative flex-col mt-16 gap-4 mx-auto justify-between items-center w-11/12 mb-3'>

            <Link to="/signup" className='bg-richblack-800 border-b-[0.5px] border-white flex flex-row gap-2 items-center hover:bg-richblack-900 text-white px-6 py-2 rounded-3xl'>
                <button >Become an instructor</button>
                <FaArrowRight />
            </Link>

            <p className='text-3xl font-inter text-white mt-3 font-semibold'>Empower Your Future with  <span className='text-blue-300'>Coding Skills</span></p>

            <p className='font-extralight text-richblack-25 opacity-70 font-inter w-[70%] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.
             Ipsa impedit voluptas fugiat, velit nobis deserunt eius labore magni veritatis eaque laudantium corrupti voluptatem, ab voluptatibus quae numquam.
              Soluta molestias, corporis asperiores impedit adipisci.</p>

            <div className='flex flex-row gap-8 mt-6'>
                {/* 2 buttons */}
                <button className='bg-yellow-50 rounded-lg px-5 py-2 border-b-[1px] border-white' onClick={()=>navigate('/signup')}>Learn More</button>
                <button className='bg-richblack-700 text-white font-medium rounded-lg px-5 py-2 border-b-[1px] border-white' onClick={()=>navigate('/login')}>Book a Demo</button>
            </div>

            <div className='shadow-blue-200 w-[70%] h-[30%] mt-5 border-b-8 border-r-8 border-white'>
                <video src={video} muted autoPlay loop></video>
            </div>


            <div className='flex flex-row w-[80%] justify-between gap-8 mt-10 ml-11'>

            <div className='flex flex-col w-[50%]'>

            <p className='text-3xl text-white w-[80%] font-semibold'>Unlock your <span className='text-blue-200'>Coding potentials</span> with our online courses</p>
            <p className='opacity-75 font-inter text-richblack-300 mt-3'>Lorem ipsum dolor sit amet ipsume consectetur adipisicing elit. Rerum deserunt dolores sapiente totam
            autem iure? Velit modi iure impedit et?</p>

            <div className='flex gap-6 mt-8'>

            <Link to='/signup'>
            <button className='bg-yellow-50 px-7 py-2 rounded-lg text-black font-inter text-[15px]
            hover:scale-95 transition-all duration-200 text-center'>Try It Yourself</button>
            </Link>

            <Link to='/login'>
            <button className='bg-richblack-400 px-4 py-2 rounded-lg font-inter text-[15px]
            hover:scale-95 transition-all duration-200 text-white border-white border-b-2 border-r-2'>Learn More</button>
            </Link> 
            </div>

            </div >


            <div className=' h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] bg-transparent shadow-lg shadow-yellow-50'> 

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>

            <div className="w-[90%] flex flex-col gap-2 font-bold font-mono text-yellow-25 pr-2">
                <TypeAnimation  
                sequence={[`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n <<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                
                style = {
                    {
                        whiteSpace: "pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}/>

            </div>

            </div>
            
            </div>

            <div className='flex flex-row w-[80%] justify-between gap-8 mt-24 ml-11'>

            <div className=' h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] bg-transparent shadow-lg shadow-blue-200'> 

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>

            <div className="w-[90%] flex flex-col gap-2 font-bold font-mono text-yellow-25 pr-2">
                <TypeAnimation  
                sequence={[`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n <<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                
                style = {
                    {
                        whiteSpace: "pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}/>

            </div>

             </div>

             <div className='flex flex-col w-[50%]'>

            <p className='text-3xl text-white font-semibold w-[50%]'>Start <span className='text-blue-200'>Coding in Seconds</span></p>
            <p className='opacity-75 font-inter text-richblack-300 mt-3'>Lorem ipsum dolor sit amet ipsume consectetur adipisicing elit. Rerum deserunt dolores sapiente totam
            autem iure? Velit modi iure impedit et?</p>

            <div className='flex gap-6 mt-8'>

            <Link to='/signup'>
            <button className='bg-yellow-50 px-7 py-2 rounded-lg text-black font-inter text-[15px]
            hover:scale-95 transition-all duration-200 text-center'>Continue Lesson</button>
            </Link>

            <Link to='/login'>
            <button className='bg-richblack-400 px-4 py-2 rounded-lg font-inter text-[15px]
            hover:scale-95 transition-all duration-200 text-white border-white border-b-2 border-r-2'>Learn More</button>
            </Link> 
            </div>

            </div >


            </div>

            <div className='mt-20'>
                <p className='text-white text-center text-3xl font-semibold'>Unlock the <span className='text-blue-200'>Power of code</span></p>
                <p className='text-white opacity-60 text-center text-sm mt-1'>Learn to Build anything You can Imagine</p>

                {/* Tab section */}
                <div className='flex flex-row mt-5 w-[55%] gap-3 items-center justify-evenly ml-52 cursor-pointer bg-richblack-800 rounded-full px-1 py-1'>
                {
                    HomePageExplore.map ( (ele,index)=>{
                        return (
                        <div key={index} className={` hover:text-richblack-5 transition-all duration-200 place-content-center ${ele.tag === course ? `text-richblack-5` :   ` text-richblack-200`}`}
                        onClick={ ()=>{
                           setcourse(ele.tag)
                           handler(ele.tag)}}>

                        <p>{ele.tag}</p>   
                        </div>
                        )
                    })
                 }
                </div>

                {/* card section */}
                <div className='mt-7 flex flex-row gap-9 mb-5'>
                {
                    courses.map ( (ele,index)=>{
                    return (   
                    <div className='flex flex-col gap-3 bg-richblack-800 h-64 w-72 text-richblack-5 rounded-md py-1'>
                        <div className='w-[90%] mx-auto'>
                        <p className='mt-4 text-white font-inter font-semibold text-xl '>{ele.heading}</p>
                        <p className='mt-3 text-base font-extralight opacity-75 text-richblack-200'>{ele.description}</p>
    
                        <div className='flex flex-row justify-between mt-16'>
                            <div className='flex gap-1 items-center'>
                                <IoPeople />
                                <p className='text-blue-300'>{ele.level}</p>
                            </div>
                            
                            <div className='flex gap-1 items-center'>
                            <IoIosPeople />
                                <p className='text-blue-300'>{ele.lessionNumber}</p>
                            </div>
                            
                        </div>
                        
                      </div>
                    </div>

                    )
                  })
                }
                
                </div>


                {/* <div className=' mt-7 mb-6 gap-10 flex flex-row'>

                <div className=' flex flex-col gap-3 bg-white h-64 w-72 text-richblack-900 rounded-md border-r-8 border-b-8 border-yellow-50 py-1'>
                    <div className='w-[90%] mx-auto'>
                    <p className='mt-4 text-richblack-900 font-inter font-semibold text-xl '>Learn HTML</p>
                    <p className='mt-3 text-base font-extralight opacity-75'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia corporis ratione numquam placeat deserunt sint dicta quia a iure quam.</p>

                    <div className='flex flex-row justify-between mt-9'>
                        <div className='flex gap-1 items-center'>
                            <IoPeople />
                            <p className='text-blue-300'>Beginner</p>
                        </div>
                        
                        <div className='flex gap-1 items-center'>
                        <IoIosPeople />
                            <p className='text-blue-300'>6 Lessons</p>
                        </div>
                        
                    </div>

                    </div>
                </div>

                <div className='flex flex-col gap-3 bg-richblack-800 h-64 w-72 text-richblack-5 rounded-md py-1'>
                    <div className='w-[90%] mx-auto'>
                    <p className='mt-4 text-white font-inter font-semibold text-xl '>Learn CSS</p>
                    <p className='mt-3 text-base font-extralight opacity-75 text-richblack-200'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia corporis ratione numquam placeat deserunt sint dicta quia a iure quam.</p>

                    <div className='flex flex-row justify-between mt-16'>
                        <div className='flex gap-1 items-center'>
                            <IoPeople />
                            <p className='text-blue-300'>Beginner</p>
                        </div>
                        
                        <div className='flex gap-1 items-center'>
                        <IoIosPeople />
                            <p className='text-blue-300'>6 Lessons</p>
                        </div>
                        
                    </div>
                    
                    </div>
                </div>

                <div className='flex flex-col gap-3 bg-richblack-800 h-64 w-72 text-richblack-5 rounded-md py-1'>
                    <div className='w-[90%] mx-auto'>
                    <p className='mt-4 text-white font-inter font-semibold text-xl '> Responsive Web Design</p>
                    <p className='mt-3 text-base font-extralight opacity-75 text-richblack-200'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia corporis ratione numquam placeat deserunt sint dicta quia a iure quam.</p>

                    <div className='flex flex-row justify-between mt-16'>
                        <div className='flex gap-1 items-center'>
                            <IoPeople />
                            <p className='text-blue-300'>Beginner</p>
                        </div>
                        
                        <div className='flex gap-1 items-center'>
                        <IoIosPeople />
                            <p className='text-blue-300'>6 Lessons</p>
                        </div>
                        
                    </div>
                    
                    </div>
                </div>

                </div> */}

            </div>

        </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-800 '>

           <div className='bg-home h-[190px] relative'>
            
            <div className='flex mx-auto items-center justify-center absolute top-16 left-[580px] gap-8'>
               
                <button className='bg-yellow-50 rounded-lg px-5 py-2 border-b-[1px] border-white text-richblack-900' onClick={()=>navigate('/signup')}>Explore Full Catalog</button>
                <button className='bg-richblack-800 text-white font-medium rounded-lg px-5 py-2 border-b-[1px] border-white' onClick={()=>navigate('/login')}>Learn More</button>
            </div>
            
           </div>

           <div className='flex flex-row gap-20 mt-4 bg-pure-greys-5 w-[80%] items-center mx-auto justify-between'>

             <div className='w-[40%]'>
                <p className='text-3xl font-inter font-semibold text-richblack-900'>Get the skills you need for a <span className='text-blue-200'>job that is in demand</span></p>
             </div>

             <div className='w-[50%] flex flex-col gap-4'>
                <p className='mt-3 text-richblack-900 opacity-90'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione corporis maiores ab dolorem animi veritatis aliquid. Facere, eaque?</p>
                <button className='bg-yellow-50 rounded-lg w-[20%] px-5 py-2 flex text-richblack-900 hover:scale-105 transition-all duration-200 border-b-[1px] border-white' onClick={()=>navigate('/signup')}>Learn More</button>
             </div>

           </div>

           <div className='bg-pure-greys-5 w-11/12 flex flex-row gap-9 items-center justify-center mt-20 ml-20'> 

           <div className='w-[32%] flex flex-col gap-5 mb-6'>
            {
                timeline.map(  (ele,index)=>{
                    return (
                    <div key={index} className='flex flex-row gap-3 items-center'>
                        <div className='w-[50px] h-[55px] flex items-center'>
                            <img src={ele.logo} alt="" />
                        </div>

                        <div className='flex flex-col gap-1'>
                        <p className='font-semibold'>{ele.heading}</p>
                        <p className='opacity-80 text-sm'>{ele.description}</p>
                        </div>
                    </div>
                    )
                })
            }
           </div>

            <div className='w-[50%] relative overflow-visible'>

               <div>
                <img src={Timelineimage} alt="" width={"600px"}/>
               </div>

               <div className='absolute bg-caribbeangreen-700 h-20 w-[400px] top-[400px] left-20 gap-10 justify-between'>

                <div className='flex flex-row gap-6 py-2 px-5'>
                <div className='flex flex-row text-white gap-4 mt-3 items-center'>
                    <p className='text-3xl font-semibold'>10</p>
                    <p className='opacity-90 text-richblack-25 leading-5'>Years of Experience</p>
                </div>

                <div className='border-r-[1px] border-richblack-25 h-10 mt-4'>

                </div>

                <div className='flex flex-row text-white gap-4 mt-3 items-center'>
                    <p className='text-3xl font-semibold'>250</p>
                    <p className='opacity-90 text-richblack-25 leading-5'>Types of Courses</p>
                </div>

                </div>

               </div>
            </div>
            
           </div>

           <div className='flex flex-col gap-5 mx-auto items-center text-center mt-20 w-11/12'>

            <div className='text-3xl font-inter font-bold'>Your Swiss Knife for <span className='text-blue-200 shadow-blue-300'>learning any language </span></div>
            <div className='w-[50%] opacity-95 text-center text-richblack-700 font-medium'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Nisi impedit quos veritatis ipsam. Eius quisquam quidem minima libero accusamus aperiam!</div>

            <div className='flex flex-row items-center justify-center mt-10 w-[70%]'>
            <img src={image1} alt="" className='object-contain translate-x-20'/>
            <img src={image3} alt="" className='object-contain z-20'/>
            <img src={image2} alt="" className='object-contain z-30 -translate-x-36'/>
            </div>

            <Link to='/signup'>
            <button className='bg-yellow-50 px-5 py-3 rounded-lg text-black font-inter text-[15px]
            hover:scale-95 transition-all duration-200 mb-10'>Learn More</button>
            </Link>

           </div>


        </div>

        {/* section 3 */}
        <div className='bg-richblack-900 text-pure-greys-5'>

        <div className='w-11/12 flex flex-row bg-richblack-900 mx-auto items-center justify-around ml-36 mt-12'>
            <div>
             <img src={instructor} alt="" className='shadow-white border-l-[20px] w-[90%] border-b-[20px] border-white'/>
            </div>

            <div className='flex flex-col w-[50%] text-richblack-5 gap-6 mb-16'>
                <p className='text-3xl w-[40%] font-semibold'>Become an <span className='text-blue-200'>instructor</span></p>
                <p className='w-[80%] text-richblack-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta voluptas tempore suscipit ipsa? Eum eveniet accusantium mollitia nisi sunt.</p>
                <button className='bg-yellow-50 text-richblack-900 rounded-lg px-5 w-[30%] font-medium py-1 border-b-[1px] border-white hover:scale-105 transition-all duration-200' onClick={()=>navigate('/signup')}>Start Learning Today</button>
            </div>
        </div>

        <div className='flex flex-col w-11/12 gap-5 mt-16'>
            <p className='text-3xl text-richblack-5 font-semibold mx-auto'>Review from other Learners</p>

            <div>
              
            </div>
        </div>

        </div>

         {/* Section 4 footer */}
         <Footer/>
    </div>
  )
}



