import useForeCasts from "../Hooks/useForeCasts";
import WeatherForecastLoader from "./Loaders/WeatherForecastLoader";
import WeatherChart from "./Charts/WeatherChart";
import WeatherForecastItem from "./WeatherForecastItem";
import css from "../Styles/index.module.scss";
import { Text, Input, Grid, Button } from "@geist-ui/core";
import { useState, memo } from "react";
import ForecastdayError from "./Errors/ForecastdayError";

function WeaterForecasts({ location, setLocation }) {
  const [locationTemp, setLocationTemp] = useState(location);
  const [days, setDays] = useState(3);
  const { data, isLoading, isError, refetch } = useForeCasts({ days, location });

  if (isError) return <ForecastdayError refetch={refetch}/>;

  if (isLoading) return <WeatherForecastLoader />;

  return (
    <div>
      <Text className="mt-4 fw-bolder" h3>
        Pronóstico
      </Text>

      <Grid.Container gap={1}>
        <Grid xs={8} sm={8} md={8} lg={8}>
          <Input
            label="Días"
            placeholder="5"
            htmlType="number"
            width="100%"
            value={days}
            min={1}
            max={3}
            onChange={(e) => setDays(e.target.value)}
          />
        </Grid>
        <Grid xs={16} sm={16} md={16} lg={16}>
          <Input
            label="Ciudad"
            placeholder="Madrid"
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

      <WeatherChart data={data?.forecast?.forecastday} />

      <ul className={css.weatherList}>
        {data?.forecast?.forecastday?.map((forecastday, key) => (
          <WeatherForecastItem {...{ forecastday, key }} />
        ))}
      </ul>
    </div>
  );
}

export default memo(WeaterForecasts);
