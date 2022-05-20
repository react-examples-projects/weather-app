import { getPublicIp } from "../Helpers/http";
import { useQuery } from "react-query";

export default function useIp() {
  const data = useQuery("ip", getPublicIp);
  return data;
}
