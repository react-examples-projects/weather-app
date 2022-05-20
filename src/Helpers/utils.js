import moment from "moment";
import "moment/locale/es"
moment.locale("es");


export const DAY_NUMBER = moment().day();
export const MONTH_NUMBER = moment().month();

export const getDayWeek = () => {
    console.log(moment.locale("es"));
  return moment.weekdays()[DAY_NUMBER];
};

export const getMonthName = () => {
  return moment.months()[MONTH_NUMBER];
};
