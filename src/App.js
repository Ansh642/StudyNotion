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
      </Routes>
      
    </div>

  );
}

export default App;


