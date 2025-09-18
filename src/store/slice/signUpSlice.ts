import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";

export type SignUpState = {
  formData: User;
  formErrors: string[];
};

const initialState: SignUpState = {
  formData: {
    id: 0,
    name: "",
    surname: "",
    email: "",
    password: "",
  },
  formErrors: [],
};

export const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {
    setName: (state, action) => void (state.formData.name = action.payload),
    setSurname: (state, action) =>
      void (state.formData.surname = action.payload),
    setEmail: (state, action) => void (state.formData.email = action.payload),
    setPassword: (state, action) =>
      void (state.formData.password = action.payload),
    setFormErrors: (state, action) => ({
      ...state,
      formErrors: action.payload,
    }),
  },
});

export const { setName, setSurname, setEmail, setPassword, setFormErrors } =
  signUpSlice.actions;
export default signUpSlice.reducer;
