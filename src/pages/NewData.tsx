import { ChangeEvent, FormEvent, useState } from "react";
import { Alert, Button, Col, Container, Form, FormText } from "react-bootstrap";
import {
  DateTimeInput,
  NumberInput,
  SelectInput,
  TextInput,
} from "../components/input/Input";
import { ENDPOINT_METHODS, EndpointMethod, RequestData } from "../types/types";
import { useInsertMutation } from "../store/slice/requestApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setResponseTimeAvg,
  setDate,
  setEndpointEndpoint,
  setErrorNumber,
  setFormErrors,
  setResponseTimeMax,
  setEndpointMethod,
  setResponseTimeMin,
  setRequestsNumber,
} from "../store/slice/newDataSlice";

const DATE_INPUT: string = "data.date";
const REQUESTS_INPUT: string = "data.requests";
const ERRORS_INPUT: string = "data.errors";
const METHOD_INPUT: string = "data.endpoint.method";
const ENDPOINT_INPUT: string = "data.endpoint.endpoint";
const MIN_INPUT: string = "data.responseTime.min";
const AVG_INPUT: string = "data.responseTime.avg";
const MAX_INPUT: string = "data.responseTime.max";
const GENERAL_ERROR = "general";

export default function NewData() {
  const formErrors: string[] = useSelector(
    (store: RootState) => store.newDataSlice.formErrors
  );
  const formData: RequestData = useSelector(
    (store: RootState) => store.newDataSlice.formData
  );
  const [triggerInsert] = useInsertMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: string[] = [];

    if (!formData.endpoint.endpoint || formData.endpoint.endpoint === "") {
      newErrors.push(ENDPOINT_INPUT);
      valid = false;
    }

    if (!formData.requests || formData.requests <= 0) {
      newErrors.push(REQUESTS_INPUT);
      valid = false;
    }

    if (!formData.errors || formData.errors <= 0) {
      newErrors.push(ERRORS_INPUT);
      valid = false;
    }

    if (!formData.responseTime.min || formData.responseTime.min <= 0) {
      newErrors.push(MIN_INPUT);
      valid = false;
    }

    if (!formData.responseTime.avg || formData.responseTime.avg <= 0) {
      newErrors.push(AVG_INPUT);
      valid = false;
    }

    if (!formData.responseTime.max || formData.responseTime.max <= 0) {
      newErrors.push(MAX_INPUT);
      valid = false;
    }

    if (!formData.date) {
      newErrors.push(DATE_INPUT);
      valid = false;
    }

    dispatch(setFormErrors(newErrors));
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await triggerInsert(formData).unwrap();
        navigate("/dashboard");
      } catch (e: any) {
        dispatch(setFormErrors(GENERAL_ERROR));
      }
    }
  };

  return (
    <Container fluid>
      <h1>New Data</h1>
      <p>Insert data manually (in case some data went missing)</p>
      <Form className="row w-100" onSubmit={handleSubmit}>
        <FormText>
          <h4>General</h4>
        </FormText>
        <Col md={3}>
          <SelectInput
            label="Method"
            value={formData.endpoint.method}
            onChange={(e) => dispatch(setEndpointMethod(e.target.value))}
            error={formErrors.includes(METHOD_INPUT)}
          >
            {ENDPOINT_METHODS.map((el) => (
              <option value={el}>{el}</option>
            ))}
          </SelectInput>
        </Col>
        <Col md={9}>
          <TextInput
            label="Endpoint"
            value={formData.endpoint.endpoint}
            onChange={(e) => dispatch(setEndpointEndpoint(e.target.value))}
            error={formErrors.includes(ENDPOINT_INPUT)}
          />
        </Col>
        <Col md={12}>
          <DateTimeInput
            label="Date and Time"
            value={formData.date}
            onChange={(e) => dispatch(setDate(e.target.value))}
            error={formErrors.includes(DATE_INPUT)}
          />
        </Col>

        <hr />
        <FormText>
          <h4>Requests</h4>
        </FormText>
        <Col md={6}>
          <NumberInput
            label="# of requests"
            value={formData.requests}
            onChange={(e) => dispatch(setRequestsNumber(e.target.value))}
            error={formErrors.includes(REQUESTS_INPUT)}
          />
        </Col>
        <Col md={6}>
          <NumberInput
            label="# of errors"
            value={formData.errors}
            onChange={(e) => dispatch(setErrorNumber(e.target.value))}
            error={formErrors.includes(ERRORS_INPUT)}
          />
        </Col>

        <hr />
        <FormText>
          <h4>Response Time</h4>
        </FormText>
        <Col md={4}>
          <NumberInput
            label="Min."
            value={formData.responseTime.min}
            onChange={(e) => dispatch(setResponseTimeMin(e.target.value))}
            error={formErrors.includes(MIN_INPUT)}
          />
        </Col>
        <Col md={4}>
          <NumberInput
            label="Avg."
            value={formData.responseTime.avg}
            onChange={(e) => dispatch(setResponseTimeAvg(e.target.value))}
            error={formErrors.includes(AVG_INPUT)}
          />
        </Col>
        <Col md={4}>
          <NumberInput
            label="Max."
            value={formData.responseTime.max}
            onChange={(e) => dispatch(setResponseTimeMax(e.target.value))}
            error={formErrors.includes(MAX_INPUT)}
          />
        </Col>

        <Button type="submit" value="primary" className="mb-3">
          Send
        </Button>

        {formErrors.includes(GENERAL_ERROR) && (
          <Alert variant="danger">
            There was an error duriing the upload of the new data: try reloading
            the page!
          </Alert>
        )}
      </Form>
    </Container>
  );
}
