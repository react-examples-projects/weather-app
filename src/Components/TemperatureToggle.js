import cls from "classnames";
import { Text, Divider } from "@geist-ui/core";
import { useGlobalStateContext } from "../Context/GlobalStateContext";

export default function TemperatureToggle({ data }) {
  const { tempType, setTempC, setTempF } = useGlobalStateContext();

  return (
    <div className="position-relative d-inline-flex">
      <Text className="d-flex align-items-center m-0 me-3 fw-bold" h2>
        {tempType === "c" ? data?.current.temp_c : data?.current.temp_f}°
      </Text>

      <div
        className="d-flex flex-column justify-content-center align-items-center p-1"
        style={{
          border: "1px solid #eee",
          borderRadius: "5px",
          right: "-45px",
          top: "-40px",
        }}
      >
        <button
          type="abort"
          className={cls(
            "btn-ghost d-flex justify-content-center align-items-center",
            {
              "text-muted": tempType !== "c",
            }
          )}
          scale={0.8}
          onClick={setTempC}
        >
          °C
        </button>
        <Divider className="w-100" style={{ margin: "2px 0" }} />
        <button
          type="abort"
          className={cls(
            "btn-ghost d-flex justify-content-center align-items-center",
            {
              "text-muted": tempType !== "f",
            }
          )}
          scale={0.8}
          onClick={setTempF}
        >
          °F
        </button>
      </div>
    </div>
  );
}
