import useForeCasts from "../Hooks/useForeCasts";
import WeatherInfo from "./WatherInfo";
import css from "../Styles/index.module.scss";
import cls from "classnames";
import { Text, Input, Grid, Button } from "@geist-ui/core";
import { FiThermometer } from "react-icons/fi";
import { BiWater, BiWind } from "react-icons/bi";
import { WiNightCloudy } from "react-icons/wi";
import { useState, memo } from "react";
import { getWeatherType } from "../Helpers/utils";

function WheaterForecasts({ location, setLocation }) {
  const [locationTemp, setLocationTemp] = useState(location);
  const [days, setDays] = useState(5);
  const { data, isLoading, isError, error } = useForeCasts({ days, location });

  if (isError) {
    return <Text>Hubo un error al cargar los pronosticos</Text>;
  }

  if (isLoading) {
    return <Text>Cargando Pronosticos...</Text>;
  }

  return (
    <div>
      <Text className="mt-4 fw-bolder" h3>
        Pronóstico
      </Text>

      <Grid.Container className="mb-2" gap={1}>
        <Grid xs={8} sm={8} md={8} lg={8}>
          <Input
            label="Días"
            placeholder="5"
            htmlType="number"
            width="100%"
            value={days}
            min={1}
            max={100}
            onChange={(e) => setDays(e.target.value)}
          />
        </Grid>
        <Grid xs={16} sm={16} md={16} lg={16}>
          <Input
            label="Ubicación"
            placeholder="Colombia"
            value={locationTemp}
            onChange={(e) => setLocationTemp(e.target.value)}
            width="100%"
          />
        </Grid>
        <Grid xs={24} sm={24} md={24} lg={24}>
          <Button
            type="success-light"
            className="ms-auto"
            scale={0.8}
            onClick={() => setLocation(locationTemp)}
          >
            Buscar
          </Button>
        </Grid>
      </Grid.Container>

      <ul className={css.weatherList}>
        {data?.forecast?.forecastday?.map((forecastday, index) => {
          return (
            <li className={css.weatherDay} key={index}>
              <div
                className={cls(css.weatherInfo, css.nohover)}
                style={{ marginLeft: "-1rem" }}
              >
                <img
                  src={forecastday.day.condition.icon}
                  width="40"
                  height="40"
                />
                <Text className="m-0 d-flex align-items-center" p>
                  {forecastday.date}
                </Text>
              </div>

              <div className="w-100 d-flex align-items-center">
                <WeatherInfo
                  text={getWeatherType(true, forecastday.day.condition.code)}
                  icon={WiNightCloudy}
                  tooltipText="Tipo de clima"
                  styleIcon={{ fontSize: "1.2em" }}
                />

                <WeatherInfo
                  text={`${forecastday.day.maxtemp_c}°`}
                  tooltipText="Temperatura del clima"
                  icon={FiThermometer}
                />

                <WeatherInfo
                  text={`${forecastday.day.maxwind_kph}km/h`}
                  tooltipText="Velocidad del viento"
                  icon={BiWind}
                />
                <WeatherInfo
                  tooltipText="Porcentaje de humedad"
                  text={`≈${forecastday.day.avghumidity}%`}
                  icon={BiWater}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(WheaterForecasts);
