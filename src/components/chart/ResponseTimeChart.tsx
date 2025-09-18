import { Radar } from "react-chartjs-2";
import { RequestData, ResponseTimeData } from "../../types/types";

type ResponseTimeChartProps = {
  requestData: RequestData[];
};

export default function ResponseTimeChart({
  requestData,
}: ResponseTimeChartProps) {
  const calculateData = (
    data: RequestData[],
    labels: string[],
    type: "MIN" | "AVG" | "MAX"
  ): number[] => {
    let calculated: number[] = [];

    labels.forEach((l) => {
      let result = 0;

      const dataForLabel = data.filter((rd) => rd.endpoint.endpoint === l);
      if (dataForLabel.length > 0) {
        result =
          dataForLabel
            .map((rd) => {
              if (type === "MIN") return rd.responseTime.min;
              if (type === "AVG") return rd.responseTime.avg;

              return rd.responseTime.max;
            })
            .reduce((a: number, b: number) => a + b, 0) / dataForLabel.length;
      }

      calculated.push(result);
    });

    return calculated;
  };

  const labels: string[] = [
    ...new Set(requestData.map((rd) => rd.endpoint.endpoint)),
  ];

  return (
    <div className="w-50">
      <Radar
        data={{
          labels,
          datasets: [
            {
              label: "Minimum",
              data: calculateData(requestData, labels, "MIN"),
              borderColor: "rgba(117, 235, 53, 0.5)",
              backgroundColor: "rgba(53, 235, 53, 0.5)",
              borderWidth: 1,
            },
            {
              label: "Average",
              data: calculateData(requestData, labels, "AVG"),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              borderWidth: 1,
            },
            {
              label: "Maximum",
              data: calculateData(requestData, labels, "MAX"),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
