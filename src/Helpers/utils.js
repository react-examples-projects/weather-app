import moment from "moment";
import weatherConditions from "../Constants/weather_conditions";
import "moment/locale/es";

moment.locale("es");

export const getCurrentTime = () => moment().format("HH:mm a");
export const DAY_NUMBER = moment().day();
export const MONTH_NUMBER = moment().month();
export const DAY_MONTH = moment().date();

export const getDayWeek = () => {
  return moment.weekdays()[DAY_NUMBER];
};

export const getMonthName = () => {
  return moment.months()[MONTH_NUMBER];
};

export const getWeatherFromCode = (code) => {
  return weatherConditions.find((w) => w.code === code);
};
