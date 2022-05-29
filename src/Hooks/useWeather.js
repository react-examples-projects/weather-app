import { getWeatherInfo } from "../Helpers/http";
import { useQuery } from "react-query";
import { getDayWeek, getMonthName, getWeatherFromCode } from "../Helpers/utils";

export default function useWeather() {
  const { data, ...args } = useQuery("locationInfo", getWeatherInfo);
  const today = getDayWeek();
  const month = getMonthName();
  const isDay = data?.current?.is_day;
  const weatherConditionObj = getWeatherFromCode(
    data?.current?.condition?.code
  );
  const weatherCondition = isDay
    ? weatherConditionObj?.day
    : weatherConditionObj?.night;

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
