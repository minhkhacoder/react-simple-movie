/** @format */

import { useEffect } from "react";
import { useState } from "react";

export default function useDebounce(initialValue = "", delay = 1000) {
  const [debounce, setDebounce] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(initialValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialValue]);
  return debounce;
}
