import { withErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { getCurrentTime, DAY_MONTH } from "../Helpers/utils";
import {
  BiCurrentLocation,
  BiWorld,
  BiCloud,
  BiWater,
  BiWind,
  BiRefresh,
} from "react-icons/bi";
import { useMemo } from "react";
import { Text, Grid, Button, Spinner, Select } from "@geist-ui/core";
import Error from "./Error";
import useWeather from "../Hooks/useWeather";
import css from "../Styles/index.module.scss";
import cls from "classnames";
import WheaterForecasts from "../Components/WeatherForecasts";
import AppLoader from "../Components/Loaders/AppLoader";
import LocationInfoError from "../Components/Errors/LocationInfoError";
import LocationInfoNotFoundError from "../Components/Errors/LocationInfoNotFoundError";
import ToggleTheme from "../Components/ToggleTheme";
import TemperatureToggle from "../Components/TemperatureToggle";

function Home() {
  const [location, setLocation] = useState("");
  const [locationMethod, setLocationMethod] = useState("geo");
  const locationObj = useMemo(() => ({ location, setLocation }), [location]);
  const {
    data,
    isLoading,
    isError,
    error,
    today,
    month,
    lastUpdated,
    weatherCondition,
    refetch,
    isRefetching,
  } = useWeather({ location, locationMethod });

  if (error?.response?.data?.error?.code === 1006)
    return <LocationInfoNotFoundError />;

  if (isError) return <LocationInfoError refetch={refetch} />;

  if (isLoading) return <AppLoader />;

  return (
    <>
      <ToggleTheme />
      <div className={cls(css.container)}>
        <Grid.Container>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} className="flex-column">
            <div className="w-100 d-flex align-items-center">
              <img
                alt="Current Temperature"
                src={data?.current.condition.icon}
              />
              
              <TemperatureToggle data={data} />
            </div>

            <div className="d-flex flex-column w-100 text-muted mt-4 ms-3">
              <Text className="d-flex align-items-center" small>
                <BiCloud className="me-2" />
                Nubes: {data?.current.cloud}%
              </Text>
              <Text className="d-flex align-items-center" small>
                <BiWater className="me-2" />
                Humedad: {data?.current.humidity}%
              </Text>
              <Text className="d-flex align-items-center" small>
                <BiWind className="me-2" />
                Viento: a {data?.current.wind_kph} km/h
              </Text>
              <Text className="d-flex align-items-center" small>
                <BiWorld className="me-2" />
                País:
                <Text className="fw-bold ms-1" b>
                  {data?.location.country}
                </Text>
              </Text>
              <Text className="d-flex align-items-center" small>
                <BiCurrentLocation className="me-2" />
                Región: {data?.location.region || "Desconocida"}
              </Text>
            </div>
          </Grid>

          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="flex-column"
            style={{
              transform: "translateY(2rem)",
            }}
          >
            <div className="d-flex align-items-center justify-content-end w-100 text-end">
              <BiCurrentLocation
                className="me-2"
                style={{ fontSize: "1.3rem" }}
              />
              <Text className="m-0 me-2" h4>
                {data.country}
              </Text>
            </div>

            <div className="w-100 text-end text-muted mb-5 mb-sm-0">
              <Text className="m-0 me-1 text-capitalize">
                {data.name}, {data.region || "Desconocido"}
              </Text>
              <Text className="m-0 me-1 text-capitalize d-inline-block">
                {today}
              </Text>
              <Text className="m-0 me-2 d-inline-block">{DAY_MONTH},</Text>
              <Text className="m-0 text-capitalize d-inline-block">
                {month}
              </Text>
              <Text className="m-0 ms-2 text-capitalize d-inline-block">
                {getCurrentTime()}
              </Text>
              <Text className="d-block text-capitalize m-0">
                {weatherCondition}
              </Text>

              <label className="d-block text-muted">
                Como detectar tu ubicación:
              </label>
              <Select
                placeholder="Forma de ubicación"
                className="mt-2"
                width="100%"
                onChange={(method) => setLocationMethod(method)}
                value={locationMethod}
              >
                <Select.Option value="ip">Dirección IP</Select.Option>
                <Select.Option value="geo">Geolocalización</Select.Option>
                <Select.Option value="auto">Automático</Select.Option>
              </Select>
            </div>
          </Grid>
        </Grid.Container>

        <WheaterForecasts {...locationObj} locationMethod={locationMethod} />

        <footer className={css.footer}>
          <Text className="d-flex align-items-center text-muted me-3" small>
            <BiWorld
              className="me-2"
              style={{
                color: "#6c757d",
              }}
            />
            {data?.tz_id}
          </Text>

          <Button
            type="abort"
            className="p-0 d-flex justify-content-center align-items-center"
            onClick={isRefetching ? null : refetch}
            auto
          >
            <Text className="d-flex align-items-center text-capitalize m-0 text-muted">
              {isRefetching ? (
                <Spinner className="me-2" />
              ) : (
                <BiRefresh
                  className="me-2"
                  style={{
                    color: "#6c757d",
                    fontSize: "1rem",
                  }}
                />
              )}
              Última actualización: {lastUpdated}
            </Text>
          </Button>
        </footer>
      </div>
    </>
  );
}

export default withErrorBoundary(Home, {
  FallbackComponent: Error,
});
