import { Text, Button } from "@geist-ui/core";

export default function LocationInfoNotFoundError() {
  return (
    <div
      className="text-center container mt-5 d-flex flex-column align-content-center justify-content-center"
      style={{ maxWidth: "600px" }}
    > 
      <img
        alt="Ubicación no encontrada"
        src="./images/forecastday_notfound.svg"
        className="w-100 d-block mx-auto"
        style={{ maxWidth: "300px" }}
      />
      <Text style={{ fontSize: "2rem" }} h1>
        Ubicación no encontrada
      </Text>
      <Text className="text-muted" p>
        La ciudad que deseas encontrar no fue localizada en el servidor, por
        favor intenta con otra.
      </Text>

      <div className="d-flex w-100 justify-content-center">
        <Button onClick={() => window.location.reload()} className="me-2">
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
