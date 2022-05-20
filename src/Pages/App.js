import { withErrorBoundary } from "react-error-boundary";
import { Text } from "@geist-ui/core";
import { getDayWeek, getMonthName, DAY_NUMBER } from "../Helpers/utils";
import Error from "../Pages/Error";
import useIpLookup from "../Hooks/useIpLookup";

function App() {
  const { data, isLoading, isError } = useIpLookup();
  const today = getDayWeek();
  const month = getMonthName();

  if (isError) {
    return (
      <>
        <Text className="fw-bold" h2>
          Ocurrió un error
        </Text>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Text className="fw-bold" h2>
          Consultando...
        </Text>
      </>
    );
  }

  return (
    <div className="container">
      <div className="d-flex">
        <Text className="m-0">{data.country_name}</Text> ||
        <Text className="m-0" title={data.continent_name}>
          {data.continent_code}
        </Text>
      </div>
      <div className="d-flex">
        <Text small>{today}</Text>
        <Text small>{DAY_NUMBER}</Text>,<Text small>{month}</Text>
      </div>
    </div>
  );
}

export default withErrorBoundary(App, {
  FallbackComponent: Error,
});
