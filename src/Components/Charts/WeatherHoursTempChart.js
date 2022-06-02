import Chart from "react-apexcharts";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { Text, Button } from "@geist-ui/core";
import { FiClock, FiThermometer, FiRepeat } from "react-icons/fi";
import { useGlobalStateContext } from "../../Context/GlobalStateContext";
import { THEMES } from "../../config";

export default function WeatherHoursTempChart({ forecastday }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const { tempType, toggleTemp, theme } = useGlobalStateContext();
  const hours = forecastday.hour.map(
    (timestamp) => timestamp.time.split(" ")[1]
  );
  const temps = forecastday.hour.map((timestamp) => {
    if (tempType === "c") return timestamp.temp_c;
    return timestamp.temp_f;
  });
  const op = {
    options: {
      theme: {
        mode: theme,
      },
      chart: {
        id: "basic-bar",
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
      <div className="d-flex align-items-center position-relative mt-3">
        <Text className="mb-0" h4>
          Temperaturas en horarios ({tempType.toUpperCase()}°)
        </Text>

        <Button
          title="Alternar entre F/C"
          aria-label="Alternar entre F/C"
          className="p-2 ms-2 m-0"
          type="abort"
          icon={<FiRepeat />}
          style={{ lineHeight: "normal", height: "auto" }}
          onClick={toggleTemp}
          auto
        />
      </div>

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
