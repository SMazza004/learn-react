export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type EndpointMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
export const ENDPOINT_METHODS: string[] = [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
];

export type EndpointData = {
  endpoint: string;
  method: EndpointMethod;
};

export type ResponseTimeData = {
  max: number;
  avg: number;
  min: number;
};

export type RequestData = {
  date: Date;
  requests: number;
  errors: number;
  endpoint: EndpointData;
  responseTime: ResponseTimeData;
};

export type EndpointRequest = {
  endpoint: string | undefined;
  method: EndpointMethod | "" | undefined;
};
