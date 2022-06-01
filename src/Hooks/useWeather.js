import { getWeatherInfo } from "../Helpers/http";
import { useQuery } from "react-query";
import { getDayWeek, getMonthName, getWeatherType } from "../Helpers/utils";

export default function useWeather({ location, locationMethod }) {
  const { data, ...args } = useQuery(
    ["locationInfo", location, locationMethod],
    getWeatherInfo
  );
  const today = getDayWeek();
  const month = getMonthName();
  const isDay = data?.current?.is_day;
  const weatherCondition = getWeatherType(
    isDay,
    data?.current?.condition?.code
  );

  const ltUpdated = data?.current?.last_updated;
  const lastUpdated = ltUpdated?.substring(0, ltUpdated?.indexOf(" "));

  return {
    data,
    ...args,
    today,
    month,
    weatherCondition,
    lastUpdated,
  };
}
