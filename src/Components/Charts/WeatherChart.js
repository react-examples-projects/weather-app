import Chart from "react-apexcharts";

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
        categories: data.map((forecast) => forecast.date),
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
