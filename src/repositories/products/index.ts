import { Product } from "./types";

export const getProducts = async () => {
  const response = await fetch(
    "https://5fc9346b2af77700165ae514.mockapi.io/products"
  ).then((res) => res.json() as Promise<Product[]>);

  return response;
};
