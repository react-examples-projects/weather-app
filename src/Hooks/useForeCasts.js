import { useQuery } from "react-query";
import { getForecast } from "../Helpers/http";

export default function useForeCasts() {
  const data = useQuery("foreCast", getForecast);
  return data;
}
