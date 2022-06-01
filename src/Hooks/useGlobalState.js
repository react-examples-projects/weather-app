import { useState } from "react";
import { THEMES } from "../config";

export default function useGlobalState() {
  const [theme, setTheme] = useState(THEMES.LIGTH);
  const themeLigth = () => setTheme(THEMES.LIGTH);
  const themeDark = () => setTheme(THEMES.DARK);
  const toggleTheme = () => {
    theme === THEMES.LIGTH ? themeDark() : themeLigth();
  };
  const [tempType, setTempType] = useState("c");
  const setTempC = () => setTempType("c");
  const setTempF = () => setTempType("f");
  const toggleTemp = () => {
    tempType === "c" ? setTempF() : setTempC();
  };

  return {
    theme,
    themeLigth,
    themeDark,
    toggleTheme,

    tempType,
    setTempC,
    setTempF,
    toggleTemp,
  };
}
