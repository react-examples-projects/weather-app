import useForeCasts from "../Hooks/useForeCasts";
import WeatherForecastLoader from "./Loaders/WeatherForecastLoader";
import WeatherChart from "./Charts/WeatherChart";
import WeatherForecastItem from "./WeatherForecastItem";
import ForecastdayError from "./Errors/ForecastdayError";
import css from "../Styles/index.module.scss";
import useCities from "../Hooks/useCities";
import { Text, Grid, Button, AutoComplete, Select } from "@geist-ui/core";
import { useState, memo } from "react";

function WeaterForecasts({ location, setLocation, locationMethod }) {
  const { options, searchHandler } = useCities();
  const [locationTemp, setLocationTemp] = useState(location);
  const [days, setDays] = useState("3");
  const { data, isLoading, isError, refetch } = useForeCasts({
    days,
    location,
    locationMethod,
  });

  if (isError) return <ForecastdayError refetch={refetch} />;

  if (isLoading) return <WeatherForecastLoader />;

  return (
    <div>
      <Text className="mt-4" h4>
        Búsqueda
      </Text>

      <Grid.Container gap={1} className="mb-2">
        <Grid xs={12} sm={8} md={8} lg={8} className="flex-column">
          <label
            htmlFor="days"
            className="text-muted d-block mb-1"
            style={{ fontSize: "0.875em" }}
          >
            Días
          </label>
          <Select
            id="days"
            value={days}
            onChange={(value) => setDays(value)}
            width="100%"
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
          </Select>
        </Grid>
        <Grid xs={12} sm={16} md={16} lg={16} className="flex-column">
          <label
            htmlFor="city"
            className="text-muted d-block mb-1"
            style={{ fontSize: "0.875em" }}
          >
            Ciudad
          </label>
          <AutoComplete
            id="city"
            placeholder="Madrid"
            width="100%"
            onSearch={searchHandler}
            onChange={(value) => setLocationTemp(value)}
            options={options}
          />
        </Grid>
        <Grid xs={24} sm={24} md={24} lg={24}>
          <Button
            type="success-light"
            scale={0.6}
            onClick={() => setLocation(locationTemp)}
          >
            Buscar
          </Button>
        </Grid>
      </Grid.Container>

      <WeatherChart data={data?.forecast?.forecastday} />

      <Text className="mt-4" h4>
        Pronóstico para {data?.location.name}
      </Text>
      <ul className={css.weatherList}>
        {data?.forecast?.forecastday?.map((forecastday, key) => (
          <WeatherForecastItem {...{ forecastday, key }} />
        ))}
      </ul>
    </div>
  );
}

export default memo(WeaterForecasts);
