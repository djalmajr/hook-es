export declare type Fn<A extends unknown[], R extends unknown> = (...args: A) => R;

export declare type Obj<T = any> = Record<string, T>;

export declare type ValueOf<T> = T[keyof T];
