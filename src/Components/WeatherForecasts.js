import useForeCasts from "../Hooks/useForeCasts";
import css from "../Styles/index.module.scss";
import { Text } from "@geist-ui/core";
import { FiThermometer } from "react-icons/fi";
import { BiWater, BiWind } from "react-icons/bi";
import { WiNightCloudy } from "react-icons/wi";
import { useState } from "react";

export default function WheaterForecasts() {
  const [days, setDays] = useState(5);
  const { data, isLoading, isError, error } = useForeCasts(days);
  console.log(data?.forecast?.forecastday);

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
      <ul className={css.weatherList}>
        {data?.forecast?.forecastday?.map((forecastday, index) => {
          return (
            <li className={css.weatherDay} key={index}>
              <div className={css.weatherInfo} style={{ marginLeft: "-1rem" }}>
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
                <div className={css.weatherInfo}>
                  <Text className="m-0 me-1" small>
                    {forecastday.day.condition.text}
                  </Text>

                  <WiNightCloudy style={{ fontSize: "1.2em" }} />
                </div>

                <div className={css.weatherInfo}>
                  <Text className="m-0 me-1" small>
                    {forecastday.day.maxtemp_c}°
                  </Text>
                  <FiThermometer style={{ fontSize: "0.875em" }} />
                </div>

                <div className={css.weatherInfo}>
                  <Text className="m-0 me-1" small>
                    {forecastday.day.maxwind_kph}km/h
                  </Text>
                  <BiWind style={{ fontSize: "0.875em" }} />
                </div>

                <div className={css.weatherInfo}>
                  <Text className="m-0 me-1" small>
                    ≈{forecastday.day.avghumidity}%
                  </Text>
                  <BiWater style={{ fontSize: "0.875em" }} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
