import { useEffect, useRef } from 'react';

/**
 * TODO: adicionar documentação
 */
export function useWhyDidYouUpdate<T extends object>(name: string, props: T): void {
  const prev = useRef<any>();

  useEffect(() => {
    if (prev.current) {
      const allKeys = Object.keys({ ...prev.current, ...props });
      const changes = {} as any;

      allKeys.forEach((key) => {
        if (prev.current?.[key] !== (props as any)[key]) {
          changes[key] = {
            from: prev.current?.[key],
            to: (props as any)[key],
          };
        }
      });

      if (Object.keys(changes).length) {
        console.log('[why-did-you-update]', name, changes);
      }
    }

    prev.current = props;
  });
}
