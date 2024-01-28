import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  user: undefined,
  loading: false,
  error: null,
};

const auth = getAuth(app);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      // return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ firstName, lastName, email, password }) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        firstName,
        lastName,
        email,
      };

      const userDoc = doc(db, "users", email);
      await setDoc(userDoc, userData);

    } catch (error) {
      throw error;
    }
  }
);

// export const getUser = () => (dispatch) => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       dispatch(setCurrentUser({ uid }));
//     } else {
//       dispatch(setCurrentUser(null));
//     }
//   });
//   return () => unsubscribe();
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(signUp.pending, signIn.pending), state => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(signUp.rejected, signIn.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(isAnyOf(signUp.fulfilled, signIn.fulfilled), (state, action) => {
        state.loading = false;
        state.error = null;
        // state.user = action.payload;
      })
  },
});

export const {
  setCurrentUser,
} = authSlice.actions;

export default authSlice.reducer;
