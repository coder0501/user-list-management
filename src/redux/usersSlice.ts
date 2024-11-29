import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

export interface User {
    id?: number; // Mark as optional for new users
    name: string;
    email: string;
    phone: string;
    company: {
      name: string;
    };
    address?: {
      street?: string;
      city?: string;
      zipcode?: string;
    };
    website?: string;
}

interface UsersState {
  data: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  data: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: { 
    addUser(state, action: PayloadAction<User>) {
      state.data.push({ ...action.payload, id: state.data.length + 1 });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users.";
      });
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;