import { createSlice } from "@reduxjs/toolkit";
import { EndpointData, EndpointMethod, RequestData } from "../../types/types";

export type DashboardFilter = {
  method?: EndpointMethod | "";
  endpoint?: string;
  startDate?: Date;
  endDate?: Date;
};

export type DashboardState = {
  requestData: RequestData[];
  filter: DashboardFilter;
};

const initialState: DashboardState = {
  requestData: [],
  filter: {},
};

export const dashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      return {
        requestData: action.payload,
        filter: state.filter,
      };
    },
    sortData: (state) =>
      void state.requestData.sort(
        (a: RequestData, b: RequestData) => a.date.getTime() - b.date.getTime()
      ),
    setFilterEndpoint: (state, action) => {
      state.filter.endpoint = action.payload;
    },
    setFilterMethod: (state, action) => {
      state.filter.method = action.payload;
    },
    resetFilter: (state) => {
      state.filter = { endpoint: "", method: "" };
    },
  },
});

export const {
  setData,
  sortData,
  setFilterEndpoint,
  setFilterMethod,
  resetFilter,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
