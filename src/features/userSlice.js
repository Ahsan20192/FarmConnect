// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  // Add more fields as needed
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
    },
    clearUser(state) {
      state.name = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
