import { createContext,useEffect,useState } from "react";

export const CourseContext = createContext();

export function CourseProvider({children}){

    const [course, setcourse] = useState({
        courseDetails :null,
        sectionDetails :null,
    });

    const fetchProduct =()=>{
        let courseData = localStorage.getItem('courseDetails');
        let sectionData = localStorage.getItem('sectionDetails');

        setcourse({
            courseDetails:JSON.parse(courseData),
            sectionDetails:JSON.parse(sectionData),
        });
        
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

