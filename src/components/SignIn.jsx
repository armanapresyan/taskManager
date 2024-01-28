import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../app/feature/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import Logo from "./Logo";
import Footer from "./Footer";
import { validateCredentials } from "../utils/validation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorLine, setErrorLine] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors({});
  }, []);

  const user = useSelector((state) => state.auth.user);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
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
      await dispatch(signIn({ email, password }));

      navigate("/tasks");
    } catch (error) {
      console.error("Sign In failed", error);
    }
  };

  return (
    <>
      <Logo />
      <div
        className="w-full h-[78%] flex justify-center items-center bg-gray-100 
      
      "
      >
        <form
          className="xl:flex xl:flex-col xl:w-[33.3%] xl:gap-[25px] xl:text-lg 
          lg:flex lg:flex-col lg:w-[40%] lg:gap-[25px]  md:text-base 
          md:flex md:flex-col md:w-[50%] md:gap-[25px]  lg:text-sm
          sm:flex sm:flex-col sm:w-[55%] sm:gap-[25px]   sm:text-sm 
          flex flex-col w-[85%] gap-[20px] text-sm
          space-y-8 bg-white p-8 rounded-xl shadow-md"
          onSubmit={onHandle}
        >
          <h1 className="text-2xl">Sign In</h1>
          <div className="flex gap-[7px]">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <p className="text-blue-500">Create An Account</p>
            </Link>
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
         
          <Button type="submit" variant="contained">
            Sign in
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
