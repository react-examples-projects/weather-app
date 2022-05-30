import { useQuery } from "react-query";
import { getForecast } from "../Helpers/http";

export default function useForeCasts(days) {
  const data = useQuery(["foreCast", days], getForecast);
  return data;
}
