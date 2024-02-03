import { useState,useEffect, createContext } from "react";
import axios from "axios";

export const ProfileContext = createContext();
    
export function ProfileProvider({children}){

    const [auth, setauth] = useState({
        user : null,
    });

    
    useEffect ( ()=>{
        const data = localStorage.getItem("auth");
        if(data)
        {
            const parseData = JSON.parse(data);
            setauth({
                user: parseData.userDetails,
            })
        }
    },[]);

    const value={
        auth,setauth,
    }
    
    return <ProfileContext.Provider value={value}>
        {children}
    </ProfileContext.Provider>

}



