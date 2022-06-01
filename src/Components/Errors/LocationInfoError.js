import { Link } from "react-router-dom";
import { Text, Button } from "@geist-ui/core";
import { BiEditAlt } from "react-icons/bi";

export default function LocationInfoError({ refetch }) {
  return (
    <div
      className="text-center container mt-5 d-flex flex-column align-content-center justify-content-center"
      style={{ maxWidth: "600px" }}
    >
      <img 
        alt="Ocurrió un error"
        src="./images/error.svg"
        className="w-100 d-block mx-auto"
        style={{ maxWidth: "300px" }}
      />
      <Text style={{ fontSize: "2rem" }} h1>
        Un error acaba de suceder
      </Text>
      <Text className="text-muted" p>
        Mientras se buscaba información sobre tu ubicación ocurrio un incidente,
        intenta verificar tu conexión de red.
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
        <Button onClick={() => window.location.reload()} className="me-2">
          Refrescar Página
        </Button>
      </div>
    </div>
  );
}
