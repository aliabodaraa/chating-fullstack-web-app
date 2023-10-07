import { useEffect, useState } from "react";
const PREFIX = "localStorage";

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
  let prefixKey = PREFIX + key;
  let [value, setValue] = useState<T>(() => {
    let valueInStore = localStorage.getItem(prefixKey);
    return valueInStore !== null
      ? JSON.parse(valueInStore)
      : typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(value));
  }, [prefixKey, value]);
  return [value, setValue] as [typeof value, typeof setValue];
};

export default useLocalStorage;
//OLD
// import { useEffect, useState } from "react";
// const PREFIX = "localStorage";

// const useLocalStorage = <T extends {} | T[] | string>(
//   key: string,
//   initialValue = "" as T
// ): [T, React.Dispatch<React.SetStateAction<T>>] => {
//   let prefixKey = PREFIX + key;
//   let [value, setValue] = useState<T>(() => {
//     let valueInStore = localStorage.getItem(prefixKey);
//     return valueInStore
//       ? JSON.parse(valueInStore)
//       : typeof initialValue === "function"
//       ? initialValue()
//       : initialValue;
//   });
//   useEffect(() => {
//     localStorage.setItem(prefixKey, JSON.stringify(value));
//   }, [prefixKey, value]);
//   let result: [T, React.Dispatch<React.SetStateAction<T>>] = [value, setValue];
//   return result;
// };

// export default useLocalStorage;
