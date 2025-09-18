import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";

export type UserState = {
  user: User | null;
  inMemoryUsers: User[];
};

const initialState: UserState = {
  user: null,
  inMemoryUsers: [
    {
      id: 1,
      name: "Simone",
      surname: "Mazza",
      email: "simone.mazza@pwc.com",
      password: "123",
    },
    {
      id: 2,
      name: "Lucia",
      surname: "Autiero",
      email: "lucia.autiero@pwc.com",
      password: "123",
    },
  ],
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      state.inMemoryUsers.forEach((u) => {
        if (u.email === email && u.password === password) state.user = u;
      });

      if (state.user === null) throw new Error("Invalid credentials");
    },
    logout: (state) => {
      state.user = null;
    },
    signup: (state, action) => {
      const { name, surname, email, password } = action.payload;
      let exists = false;
      state.inMemoryUsers.forEach((u) => {
        if (u.email === email) exists = true;
      });

      if (exists) throw new Error("Email already in use");

      // Get lastId +1
      const id = state.inMemoryUsers[state.inMemoryUsers.length - 1].id + 1;

      state.inMemoryUsers.push({
        id,
        name,
        surname,
        email,
        password,
      });
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;
