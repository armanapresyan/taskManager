import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";


export const useProjectUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            setUsers(querySnapshot.docs.map(d => d.data()))
        })();
    }, []);

    return users;
};