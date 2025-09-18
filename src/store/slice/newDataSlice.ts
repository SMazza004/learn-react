import { createSlice } from "@reduxjs/toolkit";
import { RequestData } from "../../types/types";

export type NewDataState = {
  formData: RequestData;
  formErrors: string[];
};

const initialState: NewDataState = {
  formData: {
    date: new Date(),
    requests: 0,
    errors: 0,
    endpoint: {
      method: "GET",
      endpoint: "",
    },
    responseTime: {
      min: 0,
      avg: 0,
      max: 0,
    },
  },
  formErrors: [],
};

export const newDataSlice = createSlice({
  name: "newDataSlice",
  initialState,
  reducers: {
    setDate: (state, action) =>
      void (state.formData.date = new Date(action.payload)),
    setRequestsNumber: (state, action) =>
      void (state.formData.requests = action.payload),
    setErrorNumber: (state, action) =>
      void (state.formData.errors = action.payload),
    setEndpointMethod: (state, action) =>
      void (state.formData.endpoint.method = action.payload),
    setEndpointEndpoint: (state, action) =>
      void (state.formData.endpoint.endpoint = action.payload),
    setResponseTimeMin: (state, action) =>
      void (state.formData.responseTime.min = action.payload),
    setResponseTimeAvg: (state, action) =>
      void (state.formData.responseTime.avg = action.payload),
    setResponseTimeMax: (state, action) =>
      void (state.formData.responseTime.max = action.payload),
    setFormErrors: (state, action) => ({
      ...state,
      errors: action.payload,
    }),
  },
});

export const {
  setDate,
  setRequestsNumber,
  setErrorNumber,
  setEndpointMethod,
  setEndpointEndpoint,
  setResponseTimeMin,
  setResponseTimeAvg,
  setResponseTimeMax,
  setFormErrors,
} = newDataSlice.actions;
export default newDataSlice.reducer;
