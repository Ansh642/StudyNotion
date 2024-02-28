import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { AppContext } from '../../context/Profile';


export default function InstructorPrivate() {
  
  const [ok, setOk] = useState(false);
  const {auth, setAuth} = useContext(AppContext);

  useEffect(() => {
    const authCheck = async () => {

      const res = await axios.get("/api/v1/auth/instructor-auth");
    
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) 
    authCheck();

  }, [auth?.token]);

  return ok ? <Outlet /> : "";
}




