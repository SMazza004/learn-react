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
import { ExclamationDiamond } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";

import "../assets/css/AuthLayout.css";
import { signup } from "../store/slice/userSlice";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const validateForm = () => {
    let valid = true;

    if (!name || name === "") {
      setNameError("Name cannot be empty");
      valid = false;
    } else {
      setNameError("");
    }

    if (!surname || surname === "") {
      setSurnameError("Surname cannot be empty");
      valid = false;
    } else {
      setSurnameError("");
    }

    if (!email || email === "") {
      setEmailError("Email cannot be empty");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password || password === "") {
      setPasswordError("Password cannot be empty");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        dispatch(
          signup({
            name,
            surname,
            email,
            password,
          })
        );

        navigate("/dashboard");
      } catch (e: any) {
        setError("Email already in use");
        setEmailError("Email already in use");
      }
    }
  };

  return (
    <>
      <CardHeader className="text-center bg-blue text-white py-3">
        <h4 className="mb-0">Sign Up</h4>
      </CardHeader>
      <CardBody>
        <Alert variant="danger" className={`${error ? "" : "d-none"}`}>
          {error}
        </Alert>
        <Form
          onSubmit={handleFormSubmission}
          className="d-flex flex-row flex-wrap w-100"
        >
          <FormGroup
            className="col-md-6 col-12 mb-3 px-1"
            controlId="formBasicName"
          >
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className={`${nameError ? "border-danger" : ""}`}
            />
            <FormText className={`text-danger ${nameError ? "" : "hidden"}`}>
              <ExclamationDiamond
                className={`me-1 ${nameError ? "" : "d-none"}`}
              />
              {nameError}
            </FormText>
          </FormGroup>

          <FormGroup
            className="col-md-6 col-12 mb-3 px-1"
            controlId="formBasicSurname"
          >
            <FormLabel>Surname</FormLabel>
            <FormControl
              type="text"
              placeholder="Surname"
              onChange={(e) => setSurname(e.target.value)}
              className={`${surnameError ? "border-danger" : ""}`}
            />
            <FormText className={`text-danger ${surnameError ? "" : "hidden"}`}>
              <ExclamationDiamond
                className={`me-1 ${surnameError ? "" : "d-none"}`}
              />
              {surnameError}
            </FormText>
          </FormGroup>

          <FormGroup className="col-12 mb-3 px-1" controlId="formBasicEmail">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className={`${emailError ? "border-danger" : ""}`}
            />
            <FormText className={`text-danger ${emailError ? "" : "hidden"}`}>
              <ExclamationDiamond
                className={`me-1 ${emailError ? "" : "d-none"}`}
              />
              {emailError}
            </FormText>
          </FormGroup>

          <FormGroup className="col-12 mb-3 px-1" controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`${passwordError ? "border-danger" : ""}`}
            />
            <FormText
              className={`text-danger ${passwordError ? "" : "hidden"}`}
            >
              <ExclamationDiamond
                className={`me-1 ${passwordError ? "" : "d-none"}`}
              />
              {passwordError}
            </FormText>
          </FormGroup>
          <Button variant="primary" className="w-100 mx-1" type="submit">
            Sign up
          </Button>
        </Form>
      </CardBody>
      <CardFooter className="text-center py-3">
        Already have an account?{" "}
        <Link to={"/login"}>Go to the login page!</Link>
      </CardFooter>
    </>
  );
}
