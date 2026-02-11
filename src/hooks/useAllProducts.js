// hooks/useAllProducts.js
import { useQuery } from "@tanstack/react-query";
import { handleProducts } from "../api/products-functions";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products-raw"],
    queryFn: handleProducts,
    staleTime: 1000 * 60 * 5,
  });
};
