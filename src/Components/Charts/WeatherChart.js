import Chart from "react-apexcharts";
import { Text } from "@geist-ui/core";
import { formatDateToText } from "../../Helpers/utils";

export default function WeatherChart({ data }) {
  const op = {
    options: { 
      chart: {
        id: "basic-bar",
        stroke: {
          curve: "smooth",
        },

        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        name: "Fecha",
        categories: data.map((forecast) => formatDateToText(forecast.date)),
      },
    },
    series: [
      {
        name: "Día",
        data: data.map((forecast) => forecast.day.maxtemp_c),
      },
    ],
  };

  return (
    <div className="w-100">
      <Text className="mb-0" h4>
        Temperatura
      </Text>
      <Chart
        options={op.options}
        series={op.series}
        type="bar"
        width="100%"
        height={250}
      />
    </div>
  );
}
