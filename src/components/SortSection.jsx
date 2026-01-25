import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { FilterSortComp } from "./FilterSortComp";
import {  Stack } from "@mui/material";
import { PriceSlider } from "./PriceSlider";

export const SortSection = ({
  categories,
  minPrice,
  maxPrice,
  priceRange,
  setPriceRange,
}) => {
  const {
    setSelectedCategory,
    setSortOption,
  } = useContext(ShopContext);

const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Alphabetical: A–Z",
  "Alphabetical: Z–A",
];

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <FilterSortComp
        label="Filter by:"
        listOfOptions={categories}
        onSelect={setSelectedCategory}
      />

      <FilterSortComp
        label="Sort by:"
        listOfOptions={sortOptions}
        onSelect={setSortOption}
      />

      <PriceSlider
        min={minPrice}
        max={maxPrice}
        value={priceRange}
        onChange={setPriceRange}
      />
    </Stack>
  );
};