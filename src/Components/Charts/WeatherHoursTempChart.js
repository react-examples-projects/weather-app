import Chart from "react-apexcharts";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { Text } from "@geist-ui/core";
import { FiClock, FiThermometer } from "react-icons/fi";
 
export default function WeatherHoursTempChart({ forecastday }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const hours = forecastday.hour.map(
    (timestamp) => timestamp.time.split(" ")[1]
  );
  const temps = forecastday.hour.map((timestamp) => timestamp.temp_f);
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
        name: "Hora",
        categories: hours,
      },
    },
    series: [
      {
        name: "Temperatura",
        data: temps,
      },
    ],
  };

  return (
    <div className="w-100" style={{ overflowX: "auto", overflowY: "hidden" }}>
      <Text className="mb-0 mt-4" h4>
        Temperaturas en horarios
      </Text>
      {isMobile ? (
        <ul style={{ maxHeight: "300px", overflowY: "auto" }}>
          {hours.map(
            (
              hour,
              key // no hay un id
            ) => (
              <li className="empty-pseudo" key={key}>
                <Text
                  className="me-3 text-muted d-inline-flexalign-items-center"
                  small
                >
                  <FiClock className="me-1" />
                  {hour}
                </Text>
                <Text
                  className="text-muted d-inline-flex align-items-center"
                  small
                >
                  <FiThermometer className="me-1" />
                  {temps[key]}
                </Text>
              </li>
            )
          )}
        </ul>
      ) : (
        <Chart
          options={op.options}
          series={op.series}
          type="line"
          width="100%"
          height={250}
        />
      )}
    </div>
  );
}
