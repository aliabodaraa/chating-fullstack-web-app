import { useEffect, useState } from "react";
const useTheme = (initialValue: string | Function) => {
  const [theme, setTheme] = useState<string>(() => {
    let theme = localStorage.getItem("theme");

    return theme
      ? theme
      : typeof initialValue === "function"
      ? initialValue()
      : initialValue;
  });

  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  let value: [string, React.Dispatch<React.SetStateAction<string>>] = [
    theme,
    setTheme,
  ];
  return value;
};

export default useTheme;
