import { createContext,useEffect,useState } from "react";

export const CourseContext = createContext();

export function CourseProvider({children}){

    const [course, setcourse] = useState({
        courseDetails :null,
    });

    const fetchProduct =()=>{
        let existingProduct = localStorage.getItem('courseDetails');
        setcourse(JSON.parse(existingProduct));
    }

    useEffect( ()=>{
        fetchProduct();
    },[]);

    const value={
        course,setcourse
    }

    return <CourseContext.Provider value={value}>
        {children}
    </CourseContext.Provider>

}

