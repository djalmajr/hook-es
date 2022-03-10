import { isObj, set } from 'help-es';
import { SetStateAction, useCallback, useState as useStateRct } from 'react';
import { Fn, ValueOf } from './types';

type Value<S> = SetStateAction<S> | ValueOf<S>

interface Callback<S> {
  (state: S): void;
  (callback: ((prev: S) => S)): void;
  (path: keyof S): (state: Value<S>) => void;
  (path: keyof S, state: Value<S>): void;
}

export function useState<S extends object>(init?: S): [S, Callback<S>] {
  const [state, setState] = useStateRct<S>(init || {} as S);

  const change = (...args: unknown[]): Fn<[string, unknown], void> | void => {
    const [key, val] = args;

    if (isObj(state) && typeof key === 'string') {
      return val === undefined ? change.bind(null, key) : setState(set(key, val));
    }

    return setState(key as any);
  }

  const onChange = useCallback(change, []);

  return [state, onChange as Callback<S>];
}

