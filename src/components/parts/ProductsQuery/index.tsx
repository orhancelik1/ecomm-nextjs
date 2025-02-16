import { ProductsQueryProps } from "@/components/parts/ProductsQuery/types";

const ProductsQuery = <T,>({
  queryResult,
  render,
  ...props
}: ProductsQueryProps<T>) => {
  const { data, isLoading, isFetching, isError, isSuccess } = queryResult;

  if (isLoading && isFetching) {
    return props.renderLoading ? props.renderLoading : <p>Loading...</p>;
  }

  if (isError) {
    return props.renderError ? props.renderError : <p>Error</p>;
  }

  if (isSuccess && data) {
    return render(data);
  }

  return "Something when wrong";
};

export default ProductsQuery;
