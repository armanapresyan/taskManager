import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../app/feature/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { db } from "../firebase/firebase";
import Logo from "./Logo";
import Footer from "./Footer";
import { validateCredentials } from "../utils/validation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [errorLine, setErrorLine] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear errors when component mounts
    setErrors({});
  }, []);

  const user = useSelector((state) => state.auth.user);

  console.log("user", user);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirm((showConfirm) => !showConfirm);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const onHandle = async (e) => {
    e.preventDefault();

    const validationErrors = validateCredentials(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrorLine(!errorLine);
      return;
    }

    try {
      await dispatch(signUp({ firstName, lastName, email, password }));

      navigate("/tasks");
    } catch (error) {
      console.error("Sign In failed", error);
    }
  };

  return (
    <>
      <Logo />
      <div className="w-full h-[78%] flex justify-center items-center bg-gray-100 font-medium text-base leading-7 tracking-tight">
        <form
          className="xl:flex xl:flex-col xl:w-[33.3%] xl:gap-[25px]
          lg:flex lg:flex-col lg:w-[40%] lg:gap-[25px]
          md:flex md:flex-col md:w-[50%] md:gap-[25px]
          sm:flex sm:flex-col sm:w-[55%] sm:gap-[25px]
          flex flex-col w-[85%] 
          space-y-8 bg-white p-8 rounded-xl shadow-md gap-[10px] h-[80%]" 
          onSubmit={onHandle}
        >
          <h1 className="text-2xl">Sign up</h1>
          <div className="flex gap-[7px]">
            <p>Already have an account?</p>
            <Link to="/signin">
              <p className="text-blue-500">Sign In</p>
            </Link>
          </div>
          <div className="flex gap-12">
            <TextField
              variant="standard"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
              label="First Name"
            />
            <TextField
              variant="standard"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              label="Last Name"
            />
          </div>
          <TextField
            error={errorLine}
            variant="standard"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Your email"
          />
          {errors.email && (
            <span className="text-red-500 mt-[0px] !important">
              {errors.email}
            </span>
          )}
          <FormControl variant="standard" error={errorLine}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {errors.password && (
            <span className="text-red-500 mt-[0px] !important">
              {errors.password}
            </span>
          )}
          <FormControl variant="standard" error={errorLine}>
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showConfirm ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          {errors.password && (
            <span className="text-red-500 mt-[0px] !important">
              {errors.password}
            </span>
          )}
          <Button type="submit" variant="contained" className="p-[12px]">
            Sign in
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
