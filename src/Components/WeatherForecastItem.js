import css from "../Styles/index.module.scss";
import cls from "classnames";
import WeatherInfo from "./WeatherInfo";
import useToggle from "../Hooks/useToggle";
import WeatherHoursTempChart from "./Charts/WeatherHoursTempChart";
import { memo } from "react";
import { formatDateToText, getWeatherType } from "../Helpers/utils";
import { useGlobalStateContext } from "../Context/GlobalStateContext";
import { Text, Modal, Grid } from "@geist-ui/core";
import { FiThermometer, FiEye } from "react-icons/fi";
import { BiWater, BiWind } from "react-icons/bi";
import { THEMES } from "../config";
import {
  WiNightCloudy,
  WiNightCloudyHigh,
  WiDayCloudy,
  WiDayCloudyHigh,
  WiMoonNew,
  WiNightSleet,
} from "react-icons/wi";

function WeatherForecastItem({ forecastday }) {
  const { tempType, theme } = useGlobalStateContext();
  const [isOpen, toggleOpen] = useToggle();
  const date = formatDateToText(forecastday.date);

  return (
    <>
      <li
        className={cls(css.weatherDay, {
          [css.weatherDayDark]: theme === THEMES.DARK,
        })}
      >
        <div
          className={cls(css.weatherInfo, css.nohover)}
          style={{ marginLeft: "-1rem" }}
        >
          <img
            src={forecastday.day.condition.icon}
            alt="Weather type"
            width="40"
            height="40"
          />
          <Text className="first-upper m-0" p>
            {date}
          </Text>
        </div>

        <div
          className={cls(
            "w-100 d-flex align-items-center",
            css.weatherInfoList
          )}
        >
          <WeatherInfo
            text={getWeatherType(true, forecastday.day.condition.code)}
            icon={WiNightCloudy}
            tooltipText="Tipo de clima"
            styleIcon={{ fontSize: "1.2em" }}
          />

          <WeatherInfo
            text={`${
              tempType === "c"
                ? forecastday.day.maxtemp_c
                : forecastday.day.maxtemp_f
            }°`}
            tooltipText={`Temperatura del clima (${tempType.toUpperCase()}°)`}
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

          <WeatherInfo
            classNameTooltip="ms-0 ms-sm-auto"
            tooltipText="Ver más detalles"
            text="Ver más"
            style={{ cursor: "pointer" }}
            onClick={toggleOpen}
            icon={FiEye}
          />
        </div>
      </li>

      <Modal visible={isOpen} onClose={toggleOpen} width="700px">
        <Modal.Title>{forecastday.date}</Modal.Title>

        <Modal.Content>
          <Text h4>General</Text>
          <div className="text-muted">
            <Text className="d-flex align-items-center" small>
              <BiWater className="me-1" />
              Promedio de humedad: {forecastday.day.avghumidity}%
            </Text>

            <Text className="d-flex align-items-center" small>
              <FiThermometer className="me-1" />
              Temperatura máxima: {forecastday.day.maxtemp_c}°
            </Text>

            <Text className="d-flex align-items-center" small>
              <FiThermometer className="me-1" />
              Temperatura mínima: {forecastday.day.mintemp_c}°
            </Text>
            <Text className="d-flex align-items-center" small>
              <WiNightSleet className="me-1" />
              Probabilidad diaria de lluvia:{" "}
              {forecastday.day.daily_chance_of_rain}%
            </Text>
          </div>

          <WeatherHoursTempChart forecastday={forecastday} />

          <Text className="mt-2" h4>
            Astronomía
          </Text>
          <Grid.Container gap={2}>
            <Grid>
              <div className="d-flex align-items-center mb-1">
                <WiMoonNew className="me-1" />
                <Text small>Fase lunar: {forecastday.astro.moon_phase}</Text>
              </div>
              <div className="d-flex align-items-center mb-1">
                <WiNightCloudyHigh className="me-1" />
                <Text small>Puesta lunar: {forecastday.astro.moonrise}</Text>
              </div>

              <div className="d-flex align-items-center">
                <WiNightCloudy className="me-1" />
                <Text small>Salida lunar: {forecastday.astro.moonset}</Text>
              </div>
            </Grid>

            <Grid>
              <div className="d-flex align-items-center mb-1">
                <WiDayCloudy className="me-1" />
                <Text small>Salida solar: {forecastday.astro.sunrise}</Text>
              </div>
              <div className="d-flex align-items-center">
                <WiDayCloudyHigh className="me-1" />
                <Text small>Puesta solar: {forecastday.astro.sunset}</Text>
              </div>
            </Grid>
          </Grid.Container>
        </Modal.Content>

        <Modal.Action onClick={toggleOpen}>Salir</Modal.Action>
      </Modal>
    </>
  );
}

export default memo(WeatherForecastItem);
