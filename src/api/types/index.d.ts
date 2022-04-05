type IApiResult<T = any> = {
  message: string;
  status: number;
  totalRow: number;
  data: T;
};

type IBase<T = any> = {
  ID: number;
  Status: number;
} & T;
