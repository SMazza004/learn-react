import { Doughnut } from "react-chartjs-2";
import { RequestData, EndpointData, ENDPOINT_METHODS } from "../../types/types";
import { DashboardFilter } from "../../store/slice/dashboardSlice";

type MethodsChartProps = {
  requestData: RequestData[];
  /* filter: DashboardFilter; */
};

export default function MethodsChart({ requestData }: MethodsChartProps) {
  const calculateData = (data: RequestData[], labels: string[]): number[] => {
    let calculated: number[] = [];

    labels.forEach((l) => {
      let result = 0;

      const dataForLabel = data.filter((rd) => rd.endpoint.method === l);
      if (dataForLabel.length > 0) {
        result = dataForLabel
          .map((rd) => rd.requests)
          .reduce((a: number, b: number) => a + b);
      }

      calculated.push(result);
    });

    return calculated;
  };

  const labels: string[] = ENDPOINT_METHODS;
  const data: number[] = calculateData(requestData, ENDPOINT_METHODS);

  return (
    <div className="w-50">
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              label: "# of requests",
              data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
