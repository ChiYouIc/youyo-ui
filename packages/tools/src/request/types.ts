export type ResultType<T> = {
  code: number;
  msg?: string;
  data: T;
  total: number;
};

export type ErrorResultType = {
  code: number;
  exception: string;
  msg: string;
  time: string;
};
