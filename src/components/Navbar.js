import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../data/navbar-links';
import { AppContext } from '../context/Profile';
import { FiShoppingBag } from 'react-icons/fi';
import { CartContext } from '../context/Cart';
import { GoChevronDown } from 'react-icons/go';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [select, setSelect] = useState('Home');
  const { auth, setauth } = useContext(AppContext);
  const { cart } = useContext(CartContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchCategories();
    setShow(false);
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://studynotion-2-qsjg.onrender.com/api/v1/course/showAllCategories');
      setLinks(data.allCategory || []);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem('auth');
    setauth({
      ...auth,
      user: null,
      token: '',
    });
    toast.success('Logged out successfully');
    navigate('/');
    setShow(false);
  };

  return (
    <div className="flex flex-row items-center justify-center border-b-[1px] border-richblack-700 px-3 py-2">
      <div className="w-[80%] flex flex-row items-center justify-between">
        <Link to="/">
          <img src={logo} alt="" width={160} height={42} loading="lazy" />
        </Link>
        <div className="text-white flex flex-row items-center justify-center mx-auto gap-3">
          {NavbarLinks.map((ele, index) => {
            return (
              <div key={index}>
                {ele.title === 'Catalog' ? (
                  <div className="flex flex-row items-center gap-1 cursor-pointer group">
                    <p>{ele.title}</p>
                    <GoChevronDown />
                    <div className="invisible z-40 w-[190px] absolute left-[51%] -top-[13%] gap-1 translate-x-[-50%] translate-y-[80%] flex flex-col rounded-md bg-richblack-800 p-4 text-richblack-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {links.map((category, index) => {
                        return (
                          <div key={index}>
                            <Link to={category.name}>
                              <p className="hover:text-yellow-25">{category.name}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Link to={ele.path}>
                    <p className={`${select === ele.title ? `text-yellow-25` : `text-white`}`} onClick={() => setSelect(ele.title)}>
                      {ele.title}
                    </p>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-5 items-center">
          {auth.token ? (
            <>
              {auth?.user?.accountType === 'student' ? (
                <>
                  <Link to="/dashboard/cart" className="text-white relative">
                    <FiShoppingBag size={20} />
                    {cart?.length ? (
                      <p className="absolute -top-3 left-3 bg-pink-300 flex items-center justify-center rounded-full w-5 h-5">{cart?.length}</p>
                    ) : (
                      <></>
                    )}
                  </Link>
                  <nav className="bg-gray-800">
                    <div className="flex items-center justify-between" onClick={() => setShow(!show)}>
                      <div className="flex items-center cursor-pointer">
                        <img src={auth.user.image} alt="" className="rounded-full h-7 w-7 object-contain" onClick={() => setShow(!show)} />
                      </div>
                    </div>
                    <div className={`w-24 h-16 bg-richblack-800 z-auto absolute rounded-lg px-1 py-1 visible top-10 cursor-pointer ${show === true ? `visible` : `invisible`}`}>
                      <p className="text-white cursor-pointer hover:text-yellow-25 ml-1 mt-1" onClick={() => { navigate('/dashboard/my-profile'); setShow(!show); }}>Dashboard</p>
                      <p className="text-white hover:text-yellow-25 cursor-pointer ml-1 mt-[0.5px]" onClick={logoutHandler}>Log out</p>
                    </div>
                  </nav>
                </>
              ) : (
                <>
                  <nav className="bg-gray-800 mr-20">
                    <div className="flex items-center justify-between" onClick={() => setShow(!show)}>
                      <div className="flex items-center cursor-pointer">
                        <img src={auth.user?.image} alt="" className="rounded-full h-7 w-7 object-contain" onClick={() => setShow(true)} />
                      </div>
                    </div>
                    <div className={`w-24 h-16 bg-richblack-800 z-auto absolute rounded-lg px-1 py-1 visible top-10 cursor-pointer ${show === true ? `visible` : `invisible`}`}>
                      <p className="text-white hover:text-yellow-25 ml-1 mt-1" onClick={() => { navigate('/dashboard/instructor-profile'); setShow(!show); }}>Dashboard</p>
                      <p className="text-white hover:text-yellow-25 ml-1 mt-[0.5px]" onClick={logoutHandler}>Log out</p>
                    </div>
                  </nav>
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-row gap-3">
                <button onClick={() => navigate('/login')} className="bg-richblack-700 text-richblack-5 hover:bg-richblack-800 transition-all duration-200 rounded-lg px-2 py-1">Log In</button>
                <button onClick={() => navigate('/signup')} className="bg-richblack-700 text-richblack-5 hover:bg-richblack-800 transition-all duration-200 rounded-lg px-2 py-1">Sign Up</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
