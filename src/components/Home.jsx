import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../components/Logo"
import Footer from "../components/Footer"

function Home() {
  return (
    <>
    <Logo/>
     <div className="w-full h-[78%] flex justify-center items-center bg-gray-100 font-medium text-base leading-7 tracking-tight  ">
      <div className="flex flex-col w-[60%] space-y-8 bg-white p-8 rounded-xl shadow-md xl:w-[30%] lg:w-[35%] md:w-[40%] sm:w-[45%] gap-[35px] ">
        <h1 className="text-center font-medium">Spend Time More Effectively</h1>
        
        <Link to="signup" className="flex">
          <Button variant="contained" className="flex-1">
            Sign Up
          </Button>
        </Link>
        <Link to="signin" className="flex">
          <Button variant="contained" className="flex-1">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
   
  );
}

export default Home;
