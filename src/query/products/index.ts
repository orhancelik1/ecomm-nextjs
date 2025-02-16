import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/repositories/products";

export const getProductsKey = () => ["products"];

export const useProducts = () => {
  const result = useQuery({
    queryKey: getProductsKey(),
    queryFn: getProducts,
  });

  return result;
};
