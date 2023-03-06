import { useRef } from "react";

export const usePresistValues = <T extends any>(defaultValues: T): [() => T, (newValues: T) => void] => {
  const presistedValues = useRef<T>(defaultValues);

  const updatePresistedValuess = (newValues: T) => {
      presistedValues.current = newValues
  }

  const getPresistedValues = () => {
    return presistedValues.current;
  }

  return [getPresistedValues, updatePresistedValuess]
}