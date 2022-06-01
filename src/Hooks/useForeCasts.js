import { useQuery } from "react-query";
import { getForecast } from "../Helpers/http";

export default function useForeCasts({ days, location, locationMethod }) {
  const data = useQuery(
    ["foreCast", { days, location, locationMethod }],
    getForecast
  );
  return data;
}
