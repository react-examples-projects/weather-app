import moment from "moment";
import weatherConditions from "../Constants/weather_conditions";
import "moment/locale/es";

moment.locale("es");

export const getCurrentTime = () => moment().format("HH:mm a");
export const DAY_NUMBER = moment().day();
export const MONTH_NUMBER = moment().month();
export const DAY_MONTH = moment().date();

export const formatDateToText = (date) =>
  moment(date).format("dddd, D [de] MMMM");

export const getDayWeek = () => {
  return moment.weekdays()[DAY_NUMBER];
};

export const getMonthName = () => {
  return moment.months()[MONTH_NUMBER];
};

export const getWeatherFromCode = (code) => {
  return weatherConditions.find((w) => w.code === code);
};

export const getWeatherType = (isDay, code) => {
  const weatherConditionObj = getWeatherFromCode(code);
  const weatherCondition = isDay
    ? weatherConditionObj?.day
    : weatherConditionObj?.night;

  return weatherCondition;
};

export const getUserPosition = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => resolve(pos.coords), reject);
    } else {
      reject(
        new Error("La geolocalización no está soportada en este navegador")
      );
    }
  });
};

export const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};
export const getTheme = () => localStorage.getItem("theme");

export const saveTemperature = (temp) => localStorage.setItem("temp", temp);
export const getTemperature = () => localStorage.getItem("temp");
