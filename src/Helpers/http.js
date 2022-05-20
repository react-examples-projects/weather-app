import axios from "axios";
import { API_PUBLIC_PROTOCOL, API_WEATHER_URL, IP_LOOKUP } from "../config";

const http = axios.create({
  baseURL: API_WEATHER_URL,
  headers: {
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    "X-RapidAPI-Key": "d4ceadfdb9msh29ad073607e515bp1397f3jsnb655d8656ac7",
  },
});

http.interceptors.request.use(async (config) => {
  const ip = await getPublicIp();
  if (ip) {
    config.params = {
      q: ip,
    };
  }
  return config;
});

export async function getPublicIp() {
  const res = await axios.get(API_PUBLIC_PROTOCOL);
  const ip = res.data?.ip;
  return ip;
}

export async function getLocationInfo() {
  const res = await http.get(IP_LOOKUP);
  return res.data;
}
