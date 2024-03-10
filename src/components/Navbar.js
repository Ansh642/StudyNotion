import {React,useContext,useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks}  from '../data/navbar-links'
import { AppContext } from '../context/Profile';
import { FiShoppingBag } from "react-icons/fi";
import { CartContext } from '../context/Cart';
import { GoChevronDown } from "react-icons/go";
import axios from 'axios';
import { toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";

export default function Navbar() {

  const [select, setselect] = useState('Home');
  const {auth,setauth} = useContext(AppContext);
  const {cart,setcart} = useContext(CartContext);
  const [show, setshow] = useState(false);

  const navigate = useNavigate();

  const [links, setlinks] = useState([]);

  const fetchCategories =async()=>{
    try{
      const { data } = await axios.get("/api/v1/course/showAllCategories");
      //console.log(data.allCategory);
      setlinks(data.allCategory);
    
    }
    catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  }

  useEffect ( ()=>{
    fetchCategories();
    setshow(false);
  },[])

  
  function logoutHandler(e)
  {
    e.preventDefault();

    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    setauth({
      ...auth,
      user:null,
      token:"",
    });
    toast.success("Logged out successfully");
    navigate("/");
    setshow(false);
  }


  return (

    <div className=' flex flex-row items-center justify-center border-b-[1px] border-richblack-700 px-3 py-2'>
      
      <div className='w-[80%] flex flex-row items-center justify-between'>

        <Link to='/'>
          <img src={logo} alt="" width={160} height={42} loading='lazy'/>
        </Link>

        <div className='text-white flex flex-row items-center justify-center mx-auto gap-3'>
        {
          NavbarLinks.map ( (ele,index)=>{
            return(
              <div key={index}>
              {
                ele.title==="Catalog" ? 
    
                <div className='flex flex-row items-center gap-1 cursor-pointer group '>
                <p>{ele.title}</p>
                <GoChevronDown />
    
                <div className='invisible z-40 w-[190px] absolute left-[50%] -top-[13%] gap-1 translate-x-[-50%] translate-y-[80%] flex flex-col  rounded-md bg-richblack-800 p-4 text-richblack-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                  {
                    links.map ( (ele,index) =>{
                      return (
                        <div key={index}>
                          <Link to={ele.name}>
                          <p className='hover:text-yellow-25'>{ele.name}</p>
                          </Link>
                        </div>
                      )
                    })
                  }
                </div>
                
                </div>
    
                : <Link to={ele.path}>
                <p className={`${select===ele.title ? `text-yellow-25` : `text-white`}`} onClick={()=>setselect(ele.title)}>{ele.title}</p>
                </Link>
              }
              </div>
            )
          })
        }
        </div>

        <div className='flex flex-row gap-5 items-center'>
          {
            auth.token ? (<>
            {
              auth.user.accountType === "student" ? 
              
              (<>
                
                <CiSearch className='text-white cursor-pointer' size={20}/>

                <Link to='/dashboard/cart' className='text-white relative'>
                  <FiShoppingBag size={20}/>
                   {
                    cart?.length? (<><p className='absolute -top-3 left-3 bg-pink-300 flex items-center justify-center rounded-full w-5 h-5 '>{cart?.length}</p></>) : (<></>)
                   }
                </Link>

                <nav className="bg-gray-800">
                <div className="flex items-center justify-between"  onClick={()=>setshow(!show)}>
                  <div className="flex items-center cursor-pointer"  >
                  
                    <img
                      src={auth.user.image}  
                      alt=""
                      className="rounded-full h-6 w-6 object-contain"
                      onClick={()=>setshow(!show)}
                    />
                    
                  </div>
                </div>

                <div className={`w-24 h-16 bg-richblack-800 z-auto absolute rounded-lg px-1 py-1 visible top-10 cursor-pointer ${show===true ? `visible` : `invisible`}`}>
                  <p className='text-white cursor-pointer hover:text-yellow-25 ml-1 mt-1' onClick={()=>{navigate('/dashboard/my-profile');setshow(!show)}}>Dashboard</p>
                  <p className='text-white hover:text-yellow-25 cursor-pointer ml-1 mt-[0.5px]' onClick={logoutHandler}>Log out</p>
                </div>
                </nav>

              </>) :
                
              (<>

              <nav className="bg-gray-800 mr-20">
              <div className="flex items-center justify-between"  onClick={()=>setshow(!show)}>
                <div className="flex items-center cursor-pointer"  >
                
                  <img
                    src={auth.user.image}  
                    alt=""
                    className="rounded-full h-6 w-6 object-contain"
                    onClick={()=>setshow(true)}
                  />
                  
                </div>
              </div>

              <div className={`w-24 h-16 bg-richblack-800 z-auto absolute rounded-lg px-1 py-1 visible top-10 cursor-pointer ${show===true ? `visible` : `invisible`}`}>
                <p className='text-white hover:text-yellow-25 ml-1 mt-1' onClick={()=>{navigate('/dashboard/instructor-profile');setshow(!show)}}>Dashboard</p>
                <p className='text-white hover:text-yellow-25 ml-1 mt-[0.5px]' onClick={logoutHandler}>Log out</p>
              </div>
              </nav>

              </>)
            }

            </>) :
            
            (<>
              <div className='flex flex-row gap-3'>

              <button onClick={()=>navigate("/login")} className='bg-richblack-700 text-richblack-5 hover:bg-richblack-800 transition-all duration-200 rounded-lg px-2 py-1'>Log In</button>
              <button  onClick={()=>navigate("/signup")} className='bg-richblack-700 text-richblack-5 hover:bg-richblack-800 transition-all duration-200 rounded-lg px-2 py-1'>Sign Up</button>

              </div>
            </>)
          }
        </div>


      </div>

    </div>
  )
}




