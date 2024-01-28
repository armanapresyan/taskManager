import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storage, db, app } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { setCurrentUser } from "../app/feature/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        return dispatch(setCurrentUser(null));
      }

      const storageRef = ref(storage, `user-avatars/${authUser?.uid}.png`);

      const userDocRef = doc(db, "users", authUser.email);
      const userData = await getDoc(userDocRef);
      let avatarUrl = "";

      try {
        avatarUrl = await getDownloadURL(storageRef);
      } catch {}

      const user = {
        email: authUser.email,
        uid: authUser.uid,
        avatarUrl,
        ...userData.data(),
      };

      dispatch(setCurrentUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
