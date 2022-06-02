import cities from "../Constants/cities";
import { useState } from "react";

export default function useCities() {
  const allOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));
  const [options, setOptions] = useState();
  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    const relatedOptions = allOptions.filter((item) =>
      item.value.toLowerCase().includes(currentValue.toLowerCase())
    );
    setOptions(relatedOptions);
  };
  return { options, searchHandler };
}
