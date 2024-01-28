import { doc, addDoc, collection } from 'firebase/firestore';
import { app, db } from "../firebase/firebase";

export const useEmail = (to, taskName, authorName) => {
  const email = {
    to,
    message: {
      subject: 'New task',
      html: `You have been assigned to a task ${taskName} by ${authorName}`,
    }
  };

  return async () => {
    await addDoc(collection(db, "mail"), email);
  };
};
