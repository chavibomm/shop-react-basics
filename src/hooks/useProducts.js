import { useQuery } from "@tanstack/react-query";
import { transformProducts } from "../../utils/product-utils";
import { useContext } from "react";
import { handleProducts } from "../api/products-functions";
import { ShopContext } from "../ShopContext";

export const useProducts = () => {
  const {
    selectedCategory,
    priceRange = [0, Infinity],
    sortOption,
  } = useContext(ShopContext);

  console.log({ selectedCategory, priceRange, sortOption });

  return useQuery({
        queryKey: ["all-products"],

    // queryKey: ["all-products", selectedCategory, priceRange, sortOption],
    queryFn: handleProducts,
    select: (data) =>
      transformProducts(data, {
        category: selectedCategory,
        priceRange,
        sortMethod: sortOption,
      }),
    staleTime: 1000 * 60 * 5,
  });
};