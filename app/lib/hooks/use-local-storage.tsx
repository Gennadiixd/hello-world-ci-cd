import { useRef } from "react";
import { isServer } from "@/lib/utils";

function useLocalStorage(key, initialValue) {
  const getValue = () => {
    if (isServer()) return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const { current: value } = useRef(getValue());

  const setValue = (valueToStore) => {
    if (isServer()) return undefined;

    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setValue, getValue];
}

export default useLocalStorage;
