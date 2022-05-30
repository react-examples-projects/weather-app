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
import { Text, Grid, Divider, Button, Spinner, } from "@geist-ui/core";
import Error from "../Pages/Error";
import useWeather from "../Hooks/useWeather";
import css from "../Styles/index.module.scss";
import cls from "classnames";
import WheaterForecasts from "../Components/WeatherForecasts";

function App() {
  const [location, setLocation] = useState("");
  const [tempMode, setTempMode] = useState("c");
  const {
    data,
    isLoading,
    isError,
    today,
    month,
    lastUpdated,
    weatherCondition,
    refetch,
    isRefetching,
  } = useWeather(location);

  if (isError) {
    return (
      <>
        <Text className="fw-bold" h2>
          Ocurrió un error
        </Text>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Text className="fw-bold" h2>
          Consultando...
        </Text>
      </>
    );
  }

  return (
    <div className={cls(css.container)}>
      <Grid.Container>
        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="d-flex align-items-center">
            <img alt="Current Temperature" src={data?.current.condition.icon} />
            <div className="position-relative d-inline-flex">
              <Text className="d-flex align-items-center m-0 me-3 fw-bold" h2>
                {tempMode === "c" ? data?.current.temp_c : data?.current.temp_f}
                °
              </Text>

              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{
                  right: "-45px",
                  top: "-40px",
                }}
              >
                <button
                  type="abort"
                  className={cls(
                    "btn-ghost d-flex justify-content-center align-items-center",
                    {
                      "text-muted": tempMode !== "c",
                    }
                  )}
                  scale={0.8}
                  onClick={() => setTempMode("c")}
                >
                  °C
                </button>
                <Divider className="w-100" style={{ margin: "2px 0" }} />
                <button
                  type="abort"
                  className={cls(
                    "btn-ghost d-flex justify-content-center align-items-center",
                    {
                      "text-muted": tempMode !== "f",
                    }
                  )}
                  scale={0.8}
                  onClick={() => setTempMode("f")}
                >
                  °F
                </button>
              </div>
            </div>
          </div>
        </Grid>

        <Grid
          xs={24}
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
              {data.country_name},
            </Text>
            <Text className="m-0" title={data.continent_name} h4>
              {data.continent_code}
            </Text>
          </div>

          <div className="w-100 text-end text-muted">
            <Text className="m-0 me-1 text-capitalize d-inline-block">
              {today}
            </Text>
            <Text className="m-0 me-2 d-inline-block">{DAY_MONTH},</Text>
            <Text className="m-0 text-capitalize d-inline-block">{month}</Text>
            <Text className="m-0 ms-2 text-capitalize d-inline-block">
              {getCurrentTime()}
            </Text>
            <Text className="d-block text-capitalize m-0">
              {weatherCondition}
            </Text>
          </div>
        </Grid>

        <Grid xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="d-flex flex-column w-100 text-muted ms-3">
            <Text className="d-flex align-items-center" small>
              <BiCloud className="me-2" />
              Nubes: {data?.current.cloud}%
            </Text>
            <Text className="d-flex align-items-center" small>
              <BiWater className="me-2" />
              Humedad: {data?.current.humidity}%.
            </Text>
            <Text className="d-flex align-items-center" small>
              <BiWind className="me-2" />
              Viento: a {data?.current.wind_kph} km/h.
            </Text>
          </div>
        </Grid>
      </Grid.Container>

      <WheaterForecasts {...{ location, setLocation }} />

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
  );
}

export default withErrorBoundary(App, {
  FallbackComponent: Error,
});
