import { createSlice } from "@reduxjs/toolkit";

export type LoginState = {
  email: string;
  password: string;
  errors: string[];
};

const initialState: LoginState = {
  email: "",
  password: "",
  errors: [],
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setErrors: (state, action) => ({
      ...state,
      errors: action.payload,
    }),
    setEmail: (state, action) => ({
      ...state,
      email: action.payload,
    }),
    setPassword: (state, action) => ({
      ...state,
      password: action.payload,
    }),
  },
});

export const { setErrors, setEmail, setPassword } = loginSlice.actions;
export default loginSlice.reducer;
