import { UseQueryResult, UseSuspenseQueryResult } from "@tanstack/react-query";

export type ProductsQueryProps<T> = {
  queryResult: UseQueryResult<T> | UseSuspenseQueryResult<T>;
  render: (data: T) => React.ReactNode;
  renderLoading?: React.ReactNode;
  renderError?: React.ReactNode;
};
