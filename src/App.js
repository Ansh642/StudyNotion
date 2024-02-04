import { Route, Routes } from "react-router";
import "./App.css";
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
import InstructorProfile from "./pages/instructor/Profile";
import Private from "./pages/user/Private";
import InstructorPrivate from "./pages/instructor/Private";

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

        <Route path="/dashboard" element={<Private/>}>
          <Route path="my-profile" element={<Profile/>} />
        </Route>

        <Route path="/dashboard" element={<InstructorPrivate/>}>
          <Route path="instructor-profile" element={<InstructorProfile/>} />
        </Route>


      </Routes>
      
    </div>

  );
}

export default App;


