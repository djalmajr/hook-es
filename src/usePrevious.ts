import { useEffect, useRef } from 'react';

/**
 * TODO: adicionar documentação
 */
export function usePrevious<T extends unknown>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
