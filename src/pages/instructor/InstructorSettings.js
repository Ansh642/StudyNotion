import React, { useContext,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/Profile';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function InstructorSettings() {

  const {auth,setauth} = useContext(AppContext);
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    oldPassword : "",
    newPassword : "",
  });

  const {oldPassword, newPassword} = formData;

  const [profileData, setprofileData] = useState({
    dateOfBirth : "",
    about : "",
    contactNumber : "" ,
    gender : "",
  });

  const {about, contactNumber , gender} = profileData;


  const profileChangeHandler = (e) => {
    setprofileData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const profileHandler = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.put('https://studynotion-2-qsjg.onrender.com/api/v1/profile/updateProfile',{
        gender,
        contactNumber,
        about,
      });

    if(response.data.success)
    {
      toast.success("Profile updated successfully");
    setprofileData({
      dateOfBirth:"",
      about:"",
      contactNumber:"" ,
      gender:"",
    })
    }
  }

    catch(err){
      console.log(err.message);
    }
  }


  const changeHandler = (e) => {
    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }


  const handler = async(e)=>{
    e.preventDefault();
    try{

      const {response} = await axios.post('https://studynotion-2-qsjg.onrender.com/api/v1/auth/changepassword',{
        oldPassword,
        newPassword,
      });

      if(response)
      {
        toast.success("Password updated successfully");
        navigate('/login');
        localStorage.removeItem("auth");
        setauth({
          ...auth,
          user:null,
          token:"",
        });
      }
      else
      {
        toast.error("Error updating password");
      }
    }
    catch(e){
      toast.error(e.message);
      console.log(e.message);
    }
  }

  
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


  async function deleteHandler(){
    try{
      const response = await axios.delete('https://studynotion-2-qsjg.onrender.com/api/v1/profile/deleteProfile');

      if(response.data.success)
      {
        toast.success("Profile deleted successfully");
        setauth({
          user:null,
          token : ""
        })
        navigate('/');
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }


  return (
    <div>
      <div className="flex bg-gray-100 relative">

      {/* SideBar */}
      <nav className={`flex-shrink-0 w-56 text px-4 py-2 bg-richblack-800 border-r border-gray-200 ${show===true ? "opacity-20" : ""}  ${show2===true ? "opacity-20" : ""}`}>
        {/* Sidebar content */}
        <h1 className="text-2xl font-bold text-richblack-200">StudyNotion Dashboard</h1>
        <ul className="mt-4">

          <li className="mb-2">
            <Link to="/dashboard/instructor-profile" className="text-richblack-200 hover:text-richblack-25 text-lg">My Profile</Link>
          </li>

          <li className="mb-2">
            <Link to="/dashboard/my-courses" className="text-richblack-200 hover:text-richblack-25 text-lg">My Courses</Link>
          </li>

          <div className='w-full mx-auto border-[1px] border-richblack-600 mt-3'> </div>

          <li className="mb-2 mt-3">
            <Link to="/dashboard/instructor-settings" className="text-richblack-200 hover:text-richblack-25 text-lg">Settings</Link>
          </li>

          <li className="mb-2">
            <Link to="" className="text-richblack-200 hover:text-richblack-25 text-lg" onClick={()=>setshow(true)}>Log Out</Link>
          </li>

          
        </ul>
      </nav>

      {/* My Profile Section */}
      <div className={`flex ml-32 w-[60%] flex-col gap-5 py-4 px-5 place-items-start ${show===true ? `opacity-20` : ``} ${show2===true ? "opacity-20" : ""}`}>
        <p className='text-3xl text-richblack-25'>Settings</p>
        
        <div className='w-full h-36 py-3 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-row text-richblack-5 gap-4 px-3'>

           <div className='flex flex-row items-center'>
           <img src={auth.user.image} alt="" className="rounded-full h-16 w-16 object-contain"/>
           </div>

           <div className='flex flex-col'>
              <p className='font-semibold text-lg'>Change Profile Picture</p>
              <div className='flex flex-row gap-5 mt-2'>
                <button className='bg-richblack-700 text-white font-medium rounded-lg px-3 py-1 border-b-[1px] border-white'>Select</button>
                <button className='bg-yellow-50 rounded-lg px-4 py-1 border-b-[1px] text-richblack-900 font-medium border-white'>Upload</button>
            </div>
           </div>

          </div>
          

        </div>

        <div className='w-full h-56 py-3 mt-4 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-col text-richblack-5 gap-4 px-3'>

            <div className='flex flex-row items-center'>
              <p className='text-xl font-inter font-semibold'>Personal Information</p>
            </div>

            <div className='flex flex-row gap-7 w-full'>

            <div className='flex flex-col gap-1 w-full'>
              <span className='text-sm text-richblack-200'>About</span>
            <input type="text" name="about" value={about} onChange={profileChangeHandler} className='bg-richblack-700 px-3 rounded-md outline-none py-1 w-full text-richblack-100' placeholder='Write about Yourself'/>        
            </div>  

            </div>

            <div className='flex flex-row gap-7 w-full'>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>Contact Number</span>
               <input type="text" name='contactNumber'  value={contactNumber} onChange={profileChangeHandler} className='bg-richblack-700 px-3 rounded-md outline-none py-1 w-full' placeholder='Enter Your Contact No.'/>
              </div>

              <div className='flex flex-col gap-1 w-full'>
              <span className='text-sm text-richblack-200'>Gender</span>
              <select name="gender" value={gender} onChange={profileChangeHandler} className='bg-richblack-700 text-richblack-100 outline-none py-[7px] rounded-md cursor-pointer'>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer Not to Say">Prefer Not To Say</option>
              </select>
            </div>
            
            </div>

          </div>
          
        </div>

        <button className='bg-yellow-50 hover:bg-yellow-100 rounded-lg flex flex-row place-self-end px-4 py-1 border-b-[1px] text-richblack-900 font-medium border-white' onClick={profileHandler}>Save</button>

        <div className='w-full h-44 py-3 mt-4 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-col text-richblack-5 gap-4 px-3'>

            <div className='flex flex-row items-center'>
              <p className='text-xl font-inter font-semibold'>Password</p>
            </div>

            <div className='flex flex-row gap-7 w-full'>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>Current Password</span>
               <input type="password" name="oldPassword" id="oldpassword" value={oldPassword} onChange={changeHandler} className='bg-richblack-700 px-4 rounded-md outline-none py-1 w-full' placeholder='Current Password'/>
              </div>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>New Password</span>
               <input type="password" name="newPassword" id="newpassword" value={newPassword} onChange={changeHandler} className='bg-richblack-700 px-4 rounded-md outline-none py-1 w-full' placeholder='New Password'/>
              </div>

            </div>


          </div>
          
        </div>

        <button className='bg-yellow-50 hover:bg-yellow-100 rounded-lg flex flex-row place-self-end px-4 py-1 border-b-[1px] text-richblack-900 font-medium border-white' onClick={handler}>Update</button>

        <button className='bg-richblack-700 mb-7 mt-3 hover:scale-105 mx-auto transition-all duration-200 text-white font-semibold rounded-lg px-7 py-2 border-b-[1px] border-white' onClick={()=>setshow2(true)}>Delete My Account ? </button>
        
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

      {/* Delete Account tab */}
      <div className={`absolute left-[700px] h-52 mt-96 mx-auto w-80 bg-richblack-800 rounded-2xl flex flex-col py-4 px-4 ${show2===true  ? `visible transition-all duration-100` : `invisible`}`}>

        <p className='text-richblack-5 text-2xl font-semibold'>Are You Sure you want to delete the account? </p>
        <p className='text-richblack-200 mt-2'>This action cannot be undone.</p>

        <div className='flex flex-row gap-8 mt-6 w-[90%] mx-auto'>
          <button className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg px-3 py-3 border-b-[1px] border-white' onClick={deleteHandler}>Yes Confirm</button>
          <button className='bg-richblack-700 text-white font-semibold rounded-lg px-5 py-2 border-b-[1px] border-white' onClick={()=>setshow2(false)}>Cancel</button>
        </div>

      </div>



    </div>

    
    </div>
  )
}

