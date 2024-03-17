import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPass from "./pages/ResetPass";
import ChangePass from "./pages/ChangePass";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Profile from '../src/pages/user/Profile'
import EnrolledCourses from '../src/pages/user/EnrolledCourses'
import Settings from '../src/pages/user/Settings'
import InstructorProfile from "./pages/instructor/InsProfile";
import Private from "./pages/user/Private";
import InstructorPrivate from "./pages/instructor/Private";
import Mycourses from "./pages/instructor/Mycourses";
import Cart from './pages/user/Cart';
import InstructorSettings from "./pages/instructor/InstructorSettings";
import NewCourse from "./pages/instructor/CourseInf";
import CourseBuilder from "./pages/instructor/CourseBuilder";
import CoursePublish from "./pages/instructor/CoursePublish";
import Category from "./pages/Category";
import AllCourses from "./pages/user/AllCourses";
import "./App.css";

function App() {
  return (
    <div className="bg-richblack-900 min-h-screen w-screen flex flex-col font-inter">

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/reset-password" element={<ResetPass/>}/>
        <Route path="/update-password/:id" element={<ChangePass/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/:category" element={<Category/>}/>

        {/* User Specific Routes */}
        <Route path="/dashboard" element={<Private/>}>
          <Route path="my-profile" element={<Profile/>} />
          <Route path="enrolled-courses" element={<EnrolledCourses/>} />
          <Route path="all-courses" element={<AllCourses/>} />
          <Route path="user-settings" element={<Settings/>} />
          <Route path="cart" element={<Cart/>} />
        </Route>

        {/* Instructor Specific Routes */}
        <Route path="/dashboard" element={<InstructorPrivate/>}>
          <Route path="instructor-profile" element={<InstructorProfile/>} />
          <Route path="my-courses" element={<Mycourses/>} />
          <Route path="new-course" element={<NewCourse/>} />
          <Route path="new-course-continue" element={<CourseBuilder/>} />
          <Route path="new-course-continue/:id" element={<CourseBuilder/>} />
          <Route path="new-course-final" element={<CoursePublish/>} />
          <Route path="instructor-settings" element={<InstructorSettings/>}/>

        </Route>


      </Routes>
      
    </div>

  );
}

export default App;


