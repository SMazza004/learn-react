import { Bar } from "react-chartjs-2";
import { DashboardFilter } from "../../store/slice/dashboardSlice";
import { RequestData } from "../../types/types";

type PerformanceChartProps = {
  requestData: RequestData[];
  /* filter: DashboardFilter; */
};

export default function PerformanceChart({
  requestData,
}: PerformanceChartProps) {
  const calculateAllRequests = (
    data: RequestData[],
    labels: string[]
  ): number[] => {
    let filtered: number[] = [];

    labels.forEach((l) => {
      let result: number = 0;

      const dataForLabel = data.filter((e) => e.endpoint.endpoint === l);
      if (dataForLabel.length > 0) {
        result = dataForLabel.map((e) => e.requests).reduce((a, b) => a + b);
      }

      filtered.push(result);
    });

    return filtered;
  };

  const calculateErrorRequests = (
    data: RequestData[],
    labels: string[]
  ): number[] => {
    let filtered: number[] = [];

    labels.forEach((l) => {
      let result: number = 0;

      const dataForLabel = data.filter((e) => e.endpoint.endpoint === l);
      if (dataForLabel.length > 0) {
        result = dataForLabel.map((e) => e.errors).reduce((a, b) => a + b);
      }

      filtered.push(result);
    });

    return filtered;
  };

  const labels: string[] = [
    ...new Set(requestData.map((rd: RequestData) => rd.endpoint.endpoint)),
  ];
  const allRequests: number[] = calculateAllRequests(requestData, labels);
  const errorRequests: number[] = calculateErrorRequests(requestData, labels);

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Requests",
            data: allRequests,
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "Errors",
            data: errorRequests,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }}
    />
  );
}
