import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      className="bg-blue flex h-[10%] justify-around items-center 
    xl:text-lg xl:text-white  xl:leading-7 xl:tracking-tight
    md:text-base md:text-white  md:text-base md:leading-7 md:tracking-tight
    lg:text-sm  lg:text-white  lg:text-base lg:leading-7 lg:tracking-tight
    sm:text-sm  sm:text-white  sm:text-base sm:leading-7 sm:tracking-tight
    text-[11px]  text-xs text-white  text-base leading-7 tracking-tight
   "
    >
      <div>
        <p>Manage Your Time Properly</p>
      </div>
      <div className="flex gap-[7px] ">
        <Link to="https://www.facebook.com/">
          <p>facebook</p>
        </Link>
        <Link to="https://twitter.com/">
          <p>twitter</p>
        </Link>
        <Link to="https://am.linkedin.com/">
          <p>linkedn</p>
        </Link>
      </div>
    </div>
  );
}
