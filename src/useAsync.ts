import { useCallback, useEffect, useState } from 'react';
import { Fn } from './types';

type S = 'idle' | 'pending' | 'success' | 'error';

/**
 * TODO: adicionar documentação
 */
export function useAsync<D extends unknown, P extends unknown[], E = unknown>(
  callback: Fn<P, Promise<D>>,
  ...params: P | any
) {
  const [data, setData] = useState<D>();
  const [error, setError] = useState<E>();
  const [status, setStatus] = useState<S>('idle');

  const reset = useCallback(() => {
    setData(void 0);
    setError(void 0);
    setStatus('idle');
  }, []);

  const run = useCallback(
    async (...options: P) => {
      setStatus('pending');

      try {
        setData(await callback(...options));
        setError(undefined);
        setStatus('success');
      } catch (err: E | any) {
        setError(err);
        setStatus('error');
      }
    },
    [callback],
  );

  useEffect(() => {
    if (params.length) {
      run(...params);
    }
  }, []);

  return { data, error, status, reset, run };
}
