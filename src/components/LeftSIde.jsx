import logoImg from "../img/task.png";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { storage } from "../firebase/firebase";
import { app } from "../firebase/firebase";
import { signOut, getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dontUser from "../img/dontuser.png";
import { useNavigate } from "react-router-dom";

export default function LeftSide() {
  const [image, setImage] = useState(dontUser);

  const user = useSelector((state) => state.auth.user);

  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.avatarUrl) {
      setImage(user.avatarUrl);
    }
  }, [user]);

  const handleImageChange = async (event) => {
    const fr = new FileReader();

    fr.onload = async () => {
      const newImage = fr.result;
      console.log("New Image:", newImage);
      const storageRef = ref(storage, `user-avatars/${user?.uid}.png`);

      try {
        const snapshot = await uploadBytes(storageRef, event.target.files[0]);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("File uploaded successfully. Download URL:", downloadURL);
        setImage(downloadURL);
        console.log("File uploaded successfully. Download URL:", downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    if (event.target.files.length > 0) {
      fr.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div
      className="xl:w-[20%] xl:h-[100%] xl:flex xl:flex-col 
      xl:h-full xl:items-center bg-blue font-medium text-base leading-7 
      tracking-tight lg:w-[30%] lg:flex lg:flex-col lg:h-full lg:items-center
      md:w-[35%] md:flex md:flex-col md:h-full md:items-center sm:flex sm:flex-col sm:h-full sm:items-center sm:w-[35%]
      w-full h-[20%] flex items-start justify-around
      "
    >
      <div className="flex flex-col items-center h-[15%] pt-[12px]">
        <img
          alt="logo"
          src={logoImg}
          className="w-[100px] opacity-50  rounded-[36%]"
        />
        <p className="border-b-[4px] border-teal-500 pt-[30px] w-[70%]"></p>
      </div>
      <div
        className="xl:flex xl:justify-around xl:pt-[100px] xl:h-[15%] 
          lg:flex lg:justify-around lg:pt-[100px] lg:h-[15%]
          md:flex md:justify-around md:pt-[100px] md:h-[15%]
          sm:flex sm:justify-around sm:pt-[100px] sm:h-[15%]
          hidden  w-[100%]
      "
      >
        <div className="h-[100px] w-[30%] rounded-full bg-white">
          <input
            type="file"
            onChange={handleImageChange}
            className="opacity-0  absolute h-[100px] w-[100px]"
          />

          <img
            src={image ? image : dontUser}
            alt="User"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div className="w=[60%]">
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="flex justify-end items-end h-[50%]">
        <Link
          onClick={() => signOut(auth)}
          className="flex pr-[30px] text-white"
        >
          <FaSignOutAlt />
          <p>Sign Out</p>
        </Link>
      </div>
    </div>
  );
}
