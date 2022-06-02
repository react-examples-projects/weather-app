import Chart from "react-apexcharts";
import { Text } from "@geist-ui/core";
import { formatDateToText } from "../../Helpers/utils";
import { useGlobalStateContext } from "../../Context/GlobalStateContext";
import { THEMES } from "../../config";

export default function WeatherChart({ data }) {
  const { tempType, theme } = useGlobalStateContext();
  const op = {
    options: {
      theme: {
        mode: theme,
      },

      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => `Temperatura (${tempType.toUpperCase()}°)`,
          },
        },
      },
      chart: {
        id: "temperature",
        background: theme === THEMES.DARK ? "#000" : "#fff",
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
        data: data.map((forecast) => {
          if (tempType === "c") return forecast.day.maxtemp_c;
          return forecast.day.maxtemp_f;
        }),
      },
    ],
  };

  return (
    <div className="w-100">
      <Text className="mb-0" h4>
        Temperatura ({tempType.toUpperCase()}°)
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
