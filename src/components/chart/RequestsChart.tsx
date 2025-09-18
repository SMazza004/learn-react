import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { EndpointData, RequestData } from "../../types/types";
import { DashboardFilter } from "../../store/slice/dashboardSlice";

type RequestsChartProps = {
  requestData: RequestData[];
  /* filter: DashboardFilter; */
};

export default function RequestsChart({ requestData }: RequestsChartProps) {
  const formatDate = (date: Date): string => {
    if (!date) return "";

    return `${(date.getDate() < 10 ? "0" : "") + date.getDate()}/${
      (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
    }/${date.getFullYear()} ${date.getHours()}:${
      (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    }`;
  };

  const calculateAllRequests = (
    data: RequestData[],
    labels: string[]
  ): number[] => {
    let filtered: number[] = [];

    labels.forEach((l) => {
      let result: number = 0;

      const dataForLabel = data.filter((e) => formatDate(e.date) === l);
      if (dataForLabel.length > 0) {
        result = dataForLabel.map((e) => e.requests).reduce((a, b) => a + b);
      }

      filtered.push(result);
    });

    return filtered;
  };

  const calculateErrors = (data: RequestData[], labels: string[]): number[] => {
    let filtered: number[] = [];

    labels.forEach((l) => {
      let result: number = 0;

      const dataForLabel = data.filter((e) => formatDate(e.date) === l);
      if (dataForLabel.length > 0) {
        result = dataForLabel.map((e) => e.errors).reduce((a, b) => a + b);
      }

      filtered.push(result);
    });

    return filtered;
  };

  const labels: string[] = [
    ...new Set(requestData.map((e: RequestData): string => formatDate(e.date))),
  ];
  const allRequests: number[] = calculateAllRequests(requestData, labels);
  const errors: number[] = calculateErrors(requestData, labels);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Api",
            data: allRequests,
            borderColor: "rgba(117, 235, 53, 0.5)",
            backgroundColor: "rgba(53, 235, 53, 0.5)",
          },
          {
            label: "Errors",
            data: errors,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }}
    />
  );
}
