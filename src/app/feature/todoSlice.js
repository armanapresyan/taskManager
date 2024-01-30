import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (userEmail) => {
    try {
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("assignee", "==", userEmail));
      const querySnapshot = await getDocs(q);
      const todos = querySnapshot.docs.map((doc) => doc.data());

      console.log("got", todos);

      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (newTodo, thunkAPI) => {
    try {
      console.log(newTodo);
      const docRef = await addDoc(collection(db, "tasks"), newTodo);
      console.log("Document written with ID: ", docRef, newTodo);
      return { id: docRef.id, ...newTodo };
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId, thunkAPI) => {
    try {
      const todoRef = doc(db, "todos", todoId);
      await deleteDoc(todoRef);
      return todoId; // Return the deleted todoId in the fulfilled action
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }
);



export const editTodoStatus = createAsyncThunk(
  "todo/editTodoStatus",
  async ({ userEmail, status, id }, thunkAPI) => {
    try {
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("assignee", "==", userEmail));
      const querySnapshot = await getDocs(q);

      const matchingDoc = querySnapshot.docs.find(
        (doc) => doc.data().id === id
      );

      if (matchingDoc) {
        const todoRef = doc(db, "tasks", matchingDoc.id);
        await updateDoc(todoRef, { status });

        return { status, id: matchingDoc.data().id };
      } else {
        console.error("No matching document found for the given ID");
        throw new Error("No matching document found for the given ID");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setFilteredTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.todos = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        console.log("Todo deleted successfully:", action.payload);
        const deletedTodoId = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== deletedTodoId);
        state.loading = false;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        if (action.payload.author === action.payload.assignee) {
          console.log("state", state, "action", action.payload);
          console.log("Todo add successfully:", state, action);
          state.todos.push(action?.payload);
          state.loading = false;
          state.error = null;
        }
      })
      // .addCase(editTodo.fulfilled, (state, action) => {
      //   console.log(action);
      //   state.todos = state.todos.map((todo) =>
      //     todo.id === action.payload.id ? action.payload : todo
      //   );
      //   state.loading = false;
      //   state.error = null;
      // })
      .addCase(editTodoStatus.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload) {
          const { id, status } = payload;

          const updatedTodoIndex = state.todos.findIndex(
            (todo) => todo.id === id
          );
          if (updatedTodoIndex !== -1) {
            state.todos[updatedTodoIndex].status = status;
          }
        }
        state.loading = false;
        state.error = null;
      });
  },
});

export default todoSlice.reducer;

export const { setFilteredTodos } = todoSlice.actions;
