import { useState, useEffect } from "react";
import { THEMES } from "../config";
import {
  getTemperature,
  getTheme,
  saveTemperature,
  saveTheme,
} from "../Helpers/utils";

export default function useGlobalState() {
  const [theme, setTheme] = useState(getTheme() || THEMES.LIGTH);
  const themeLigth = () => setTheme(THEMES.LIGTH);
  const themeDark = () => setTheme(THEMES.DARK);
  const toggleTheme = () => {
    theme === THEMES.LIGTH ? themeDark() : themeLigth();
  };
  const [tempType, setTempType] = useState(getTemperature() || "c");
  const setTempC = () => setTempType("c");
  const setTempF = () => setTempType("f");
  const toggleTemp = () => {
    tempType === "c" ? setTempF() : setTempC();
  };

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveTemperature(tempType);
  }, [tempType]);

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
