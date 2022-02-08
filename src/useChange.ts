import { Curried, curry, set } from 'help-es';
import { SetStateAction, useCallback, useState } from 'react';

export function useChange<T extends object>(
  defaults: T = {} as T,
): [T, Curried<[key: keyof T | null, val: SetStateAction<T>], void>] {
  const [changed, setChange] = useState<T>(defaults);

  const change = curry((key: keyof T | null, val: SetStateAction<T>) => {
    setChange(key ? set(key as any, val) : val);
  });

  const onChange = useCallback(change, []);

  return [changed, onChange];
}
