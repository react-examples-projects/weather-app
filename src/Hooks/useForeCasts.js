import { useQuery } from "react-query";
import { getForecast } from "../Helpers/http";

export default function useForeCasts({ days, location }) {
  const data = useQuery(["foreCast", { days, location }], getForecast);
  return data;
}
