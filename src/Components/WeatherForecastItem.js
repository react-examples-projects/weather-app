import css from "../Styles/index.module.scss";
import cls from "classnames";
import WeatherInfo from "./WeatherInfo";
import { getWeatherType } from "../Helpers/utils";
import { Text } from "@geist-ui/core";
import { FiThermometer } from "react-icons/fi";
import { BiWater, BiWind } from "react-icons/bi";
import { WiNightCloudy } from "react-icons/wi";

export default function WeatherForecastItem({ forecastday }) {
  return (
    <li className={css.weatherDay}>
      <div
        className={cls(css.weatherInfo, css.nohover)}
        style={{ marginLeft: "-1rem" }}
      >
        <img src={forecastday.day.condition.icon} width="40" height="40" />
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
}
