import {
  Alert,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { login, logout } from "../store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationDiamond } from "react-bootstrap-icons";

import "../assets/css/AuthLayout.css";
import { RootState } from "../store/store";
import { User } from "../types/types";
import { EmailInput, PasswordInput } from "../components/input/Input";
import { setEmail, setErrors, setPassword } from "../store/slice/loginSlice";

const EMAIL_INPUT = "email";
const PASSWORD_INPUT = "password";
const GENERAL_ERROR = "general";

export default function Login() {
  const navigate = useNavigate();
  const email: string = useSelector(
    (store: RootState) => store.loginSlice.email
  );
  const password: string = useSelector(
    (store: RootState) => store.loginSlice.password
  );
  const errors: string[] = useSelector(
    (store: RootState) => store.loginSlice.errors
  );
  const dispatch = useDispatch();
  const user: User | null = useSelector(
    (store: RootState) => store.userSlice.user
  );

  useEffect(() => {
    if (user !== null) dispatch(logout());
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors: string[] = [];

    if (!email || email === "") {
      newErrors.push(EMAIL_INPUT);
      valid = false;
    }

    if (!password || password === "") {
      newErrors.push(PASSWORD_INPUT);
      valid = false;
    }

    dispatch(setErrors(newErrors));
    return valid;
  };

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        dispatch(
          login({
            email,
            password,
          })
        );

        navigate("/dashboard");
      } catch (e: any) {
        dispatch(setErrors([GENERAL_ERROR]));
      }
    }
  };

  return (
    <>
      <CardHeader className="text-center bg-blue text-white py-3">
        <h4 className="m-0">Login</h4>
      </CardHeader>
      <CardBody className="py-4 px-4">
        {errors.includes(GENERAL_ERROR) && (
          <Alert variant="danger">Invalid credentials</Alert>
        )}
        <Form onSubmit={handleFormSubmission}>
          <EmailInput
            label="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(setEmail(e.target.value))
            }
            error={errors.includes(EMAIL_INPUT)}
          />

          <PasswordInput
            label="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(setPassword(e.target.value))
            }
            error={errors.includes(PASSWORD_INPUT)}
          />
          <Button variant="primary" className="w-100" type="submit">
            Login
          </Button>
        </Form>
      </CardBody>
      <CardFooter className="text-center py-3">
        Don't have an account? <Link to={"/signup"}>Create a new one!</Link>
      </CardFooter>
    </>
  );
}
