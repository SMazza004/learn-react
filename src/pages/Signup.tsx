import {
  Alert,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../assets/css/AuthLayout.css";
import { signup } from "../store/slice/userSlice";
import { RootState } from "../store/store";
import { User } from "../types/types";
import {
  setEmail,
  setFormErrors,
  setPassword,
  setName,
  setSurname,
} from "../store/slice/signUpSlice";
import {
  EmailInput,
  PasswordInput,
  TextInput,
} from "../components/input/Input";

const NAME_INPUT = "data.name";
const SURNAME_INPUT = "data.surname";
const EMAIL_INPUT = "data.email";
const PASSWORD_INPUT = "data.password";
const EMAIL_ERROR = "error.email";

export default function Signup() {
  const formData: User = useSelector(
    (store: RootState) => store.signUpSlice.formData
  );
  const formErrors: string[] = useSelector(
    (store: RootState) => store.signUpSlice.formErrors
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let valid = true;
    const newErrors: string[] = [];

    if (!formData.name) {
      newErrors.push(NAME_INPUT);
      valid = false;
    }

    if (!formData.surname) {
      newErrors.push(SURNAME_INPUT);
      valid = false;
    }

    if (!formData.email) {
      newErrors.push(EMAIL_INPUT);
      valid = false;
    }

    if (!formData.password) {
      newErrors.push(PASSWORD_INPUT);
      valid = false;
    }

    dispatch(setFormErrors(newErrors));
    return valid;
  };

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        dispatch(
          signup({
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
          })
        );

        navigate("/dashboard");
      } catch (e: any) {
        dispatch(setFormErrors([EMAIL_ERROR]));
      }
    }
  };

  return (
    <>
      <CardHeader className="text-center bg-blue text-white py-3">
        <h4 className="mb-0">Sign Up</h4>
      </CardHeader>
      <CardBody>
        {formErrors.includes(EMAIL_ERROR) && (
          <Alert variant="danger">Email already in use</Alert>
        )}
        <Form onSubmit={handleFormSubmission} className="row m-0 w-100">
          <Col md={6}>
            <TextInput
              label="Name"
              value={formData.name}
              onChange={(e) => dispatch(setName(e.target.value))}
              error={formErrors.includes(NAME_INPUT)}
            />
          </Col>
          <Col md={6}>
            <TextInput
              label="Surname"
              value={formData.surname}
              onChange={(e) => dispatch(setSurname(e.target.value))}
              error={formErrors.includes(SURNAME_INPUT)}
            />
          </Col>

          <Col md={12}>
            <EmailInput
              label="Email"
              value={formData.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              error={formErrors.includes(EMAIL_INPUT)}
            />
          </Col>

          <Col md={12}>
            <PasswordInput
              label="Password"
              value={formData.password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              error={formErrors.includes(PASSWORD_INPUT)}
            />
          </Col>

          <Button variant="primary" className="w-100" type="submit">
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
