import { getLocationInfo } from "../Helpers/http";
import { useQuery } from "react-query";

export default function useIpLookup() {
  const data = useQuery("locationInfo", getLocationInfo);
  return data;
}
