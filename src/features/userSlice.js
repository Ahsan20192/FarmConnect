// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  img:"",
  // Add more fields as needed
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.img=action.payload.img;
    },
    clearUser(state) {
      state.name = "";
      state.img="";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
