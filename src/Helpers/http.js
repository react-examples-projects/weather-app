import axios from "axios";
import {
  API_PUBLIC_PROTOCOL,
  API_WEATHER_URL,
  REALTIME_WEATHER,
  IP_LOOKUP,
  FORECAST,
} from "../config";

const http = axios.create({
  baseURL: API_WEATHER_URL,
  headers: {
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    "X-RapidAPI-Key": "d4ceadfdb9msh29ad073607e515bp1397f3jsnb655d8656ac7",
  },
});

http.interceptors.request.use(async (config) => {
  const ip = await getPublicIp();

  if (config.url !== "ip.json") {
    console.log(config.params);
    config.params = {
      ...config.params,
      q: config?.params?.q || ip,
    };
  } else {
    if (ip) {
      config.params = {
        ...config.params,
        q: ip,
      };
    }
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

export async function getWeather() {
  const res = await http.get(REALTIME_WEATHER);
  return res.data;
}

export async function getForecast({ queryKey }) {
  const [, { days, location }] = queryKey;
  console.log({ days, location });
  const q = location ? `&q=${location}` : "";
  let params = `?days=${days}` + q;
  const res = await http.get(`${FORECAST}${params}`);
  return res.data;
}

export async function getWeatherInfo({ queryKey }) {
  const [, q] = queryKey;
  const p1 = http.get(IP_LOOKUP, { params: { q } });
  const p2 = http.get(REALTIME_WEATHER, { params: { q } });

  const res = (await Promise.all([p1, p2])).map((obj) => obj.data);
  const data = res.reduce((prev, current) => ({ ...prev, ...current }), {});
  return data;
}
