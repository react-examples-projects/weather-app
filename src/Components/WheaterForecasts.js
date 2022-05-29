import useForeCasts from "../Hooks/useForeCasts";
import { Text } from "@geist-ui/core";

export default function WheaterForecasts() {
  const { data, isLoading, isError, error } = useForeCasts();
  console.log(data?.forecast?.forecastday);

  if (isError) {
    return <Text>Hubo un error al cargar los pronosticos</Text>;
  }

  if (isLoading) {
    return <Text>Cargando Pronosticos...</Text>;
  }

  return (
    <div>
      <Text className="mt-4 fw-bolder" h3>
        Pronóstico
      </Text>
      <ul>
        {data?.forecast?.forecastday?.map((forecastday, index) => {
          return <li key={index}>{forecastday.date}</li>;
        })}
      </ul>
    </div>
  );
}
