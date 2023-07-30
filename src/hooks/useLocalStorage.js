import { useState, useEffect } from "react";

const getValue = (key, initialValue) => {
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;
  return initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
