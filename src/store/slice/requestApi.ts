import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  EndpointMethod,
  EndpointRequest,
  RequestData,
} from "../../types/types";

const transformResponse = (response: RequestData[]) => {
  return response.map((item) => transformSingularResponse(item));
};

const transformSingularResponse = (response: RequestData) => {
  return {
    ...response,
    date: new Date(response.date),
  };
};

export const requestApi = createApi({
  reducerPath: "requestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/requests",
  }),
  endpoints: (build) => ({
    findAll: build.query<RequestData[], undefined>({
      query: () => "",
      transformResponse,
    }),
    findByEndpoint: build.query<RequestData[], EndpointRequest>({
      query: ({ endpoint, method }: EndpointRequest) => {
        const url = "/endpoint";

        if (!endpoint && method) {
          return {
            url,
            method: "GET",
            params: {
              method,
            },
          };
        }

        if (!method && endpoint) {
          return {
            url,
            method: "GET",
            params: {
              endpoint,
            },
          };
        }

        if (method && endpoint) {
          return {
            url,
            method: "GET",
            params: {
              method,
              endpoint,
            },
          };
        }

        return "";
      },
      transformResponse,
    }),
    insert: build.mutation<RequestData, RequestData>({
      query: (data: RequestData) => ({
        url: "",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: transformSingularResponse,
    }),
  }),
});

export const { useFindAllQuery, useFindByEndpointQuery, useInsertMutation } =
  requestApi;
