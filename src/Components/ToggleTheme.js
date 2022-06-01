import css from "../Styles/index.module.scss";
import cls from "classnames";
import { THEMES } from "../config";
import { Toggle } from "@geist-ui/core";
import { useGlobalStateContext } from "../Context/GlobalStateContext";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ToggleTheme() {
  const { toggleTheme, theme } = useGlobalStateContext();

  return (
    <div className={cls(css.toggleThemeContainer, "d-flex align-items-center")}>
      {theme === THEMES.DARK ? <FiMoon /> : <FiSun />}
      <Toggle
        scale={1.4}
        onChange={toggleTheme}
        className="ms-1"
        style={{ transform: "translateY(-4px)" }}
      >
        ToggleTheme
      </Toggle>
    </div>
  );
}
