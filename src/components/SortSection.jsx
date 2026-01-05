import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { FilterSortComp } from "./FilterSortComp";
import { Box, Stack, Typography } from "@mui/material";

export const SortSection = () => {
  const { categories, handleCatChange, handleSortChange } =
    useContext(ShopContext);

  const sortOptions = [
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
  ];

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <FilterSortComp
        onSelect={handleCatChange}
        label="Filter by"
        listOfOptions={categories}
      />

      <FilterSortComp
        onSelect={handleSortChange}
        label="Sort by"
        listOfOptions={sortOptions}
      />
    </Stack>
  );
};
