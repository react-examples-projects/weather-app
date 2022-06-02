import axios from "axios";
import {
  API_PUBLIC_PROTOCOL,
  API_WEATHER_URL,
  REALTIME_WEATHER,
  IP_LOOKUP,
  FORECAST,
} from "../config";
import { getUserPosition } from "./utils";

const http = axios.create({
  baseURL: API_WEATHER_URL,
  headers: {
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    "X-RapidAPI-Key": "d4ceadfdb9msh29ad073607e515bp1397f3jsnb655d8656ac7",
  },
});

http.interceptors.request.use(async (config) => {
  const fullUrl = config.baseURL + config.url;
  const URL = new URLSearchParams(fullUrl);
  // si es una request a timezone.json usamos una ip local para la busqueda
  const isLocalGeo = config.url === "timezone.json";
  const q = isLocalGeo ? null : config.params?.q || URL.get("q");
  let ip = sessionStorage.getItem("ip");
  const getUserLocation = async () => {
    try {
      const coords = await getUserPosition();
      return `${coords.latitude},${coords.longitude}`;
    } catch {
      return "auto:ip";
    }
  };
  
  switch (config.params?.locationMethod) {
    case "auto": {
      ip = "auto:ip";
      break;
    }
    case "ip": {
      try {
        ip = await getPublicIp();
      } catch {
        ip = await getUserLocation();
      }
      break;
    }
    case "geo": {
      ip = await getUserLocation();
      break;
    }
    default:
      ip = "auto:ip";
      break;
  }
  config.params = {
    q: q === null ? ip : q,
    lang: "es",
  };

  delete config.params?.locationMethod;
  return config;
});

export async function getPublicIp() {
  let ip = sessionStorage.getItem("ip");
  if (!!ip) return ip;

  const res = await axios.get(API_PUBLIC_PROTOCOL);
  ip = res.data?.ip;
  sessionStorage.setItem("ip", ip);
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
  const [, { days, location, locationMethod }] = queryKey;
  const q = location ? `&q=${location}` : "";
  const params = `?days=${days}` + q;
  const res = await http.get(`${FORECAST}${params}`, {
    params: { locationMethod },
  });
  return res.data;
}

export async function getWeatherInfo({ queryKey }) {
  const [, q, locationMethod] = queryKey;
  const p1 = await http.get(IP_LOOKUP, { params: { q, locationMethod } });
  const p2 = http.get(REALTIME_WEATHER, { params: { q, locationMethod } });
  const res = (await Promise.all([p1, p2])).map((obj) => {
    if (obj.config.url === "timezone.json") return obj.data?.location;
    return obj.data;
  });
  const data = res.reduce((prev, current) => ({ ...prev, ...current }), {});

  return data;
}
