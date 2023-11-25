import { useState, useCallback, useEffect } from 'react';

type Storable = string | number | boolean | object | null;

const isNullOrUndefined = (value: any): value is null | undefined => value === null || value === undefined;

export const useLocalStorage = <T extends Storable>(localStorageKey: string, initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);

  // Function to get item from localStorage
  const getItem = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    const storedValue = window.localStorage.getItem(localStorageKey);
    if (isNullOrUndefined(storedValue)) {
      return initialValue;
    }
    try {
      const parsedValue: T = JSON.parse(storedValue);
      return parsedValue;
    } catch (e) {
      return storedValue as T;
    }
  }, [localStorageKey, initialValue]);

  // Function to set item in localStorage
  const setItem = useCallback((value: T) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(localStorageKey, JSON.stringify(value));
    }
  }, [localStorageKey]);

  // Initialize state from localStorage
  useEffect(() => {
    setState(getItem());
  }, [getItem]);

  const setValue = useCallback(
    (valueOrPrevValFunction: T | ((prevValue: T) => T)) => {
      setState((prevState) => {
        const newState = valueOrPrevValFunction instanceof Function ? valueOrPrevValFunction(prevState) : valueOrPrevValFunction;
        setItem(newState);
        return newState;
      });
    },
    [setItem]
  );

  return [state, setValue] as const;
};
