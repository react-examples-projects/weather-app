import { Link } from "react-router-dom";
import { Text, Button } from "@geist-ui/core";
import { BiEditAlt } from "react-icons/bi";

export default function ForecastdayError({ refetch }) {
  return (
    <div
      className="text-center container mb-5 d-flex flex-column align-content-center justify-content-center"
      style={{ maxWidth: "600px" }}
    > 
      <img
        alt="Ocurrió un error"
        src="./images/forecastday_error.svg"
        className="w-100 d-block mx-auto"
        style={{ maxWidth: "300px" }}
      />
      <Text style={{ fontSize: "2rem" }} h1>
        Un error acaba de suceder
      </Text>
      <Text className="text-muted" p>
        Mientras se buscaba información sobre los pronosticos ocurrio un error,
        pude ser que no se haya encontrado la ubicación o un error de tu
        conexión de red.
      </Text>
      <Text type="success" className="mb-2" small>
        <Link
          to="/contact"
          className="w-100 justify-content-center d-flex align-items-center"
        >
          <BiEditAlt className="me-1" style={{ fontSize: "1rem" }} />
          Si el error persiste considera avisarnos
        </Link>
      </Text>
      <div className="d-flex w-100 justify-content-center">
        <Button onClick={refetch} type="success" className="me-2">
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
