import { useCallback, useState } from 'react';

/**
 * TODO: adicionar documentação
 */
export function useToggle(value = false): [boolean, () => void] {
  const [state, setState] = useState(value);
  const toggle = useCallback(() => setState((s) => !s), []);

  return [state, toggle];
}
