import { useContext } from "react";
import { PriceSlider } from "./PriceSlider";
import { SortSection } from "./SortSection";
import { ShopContext } from "../ShopContext";
import { Box, Typography, Divider } from "@mui/material";


export const NavSection = () => {
  const { minPrice, maxPrice, priceRange, handlePriceChange } =
    useContext(ShopContext);

  console.log("handlePriceChange:", handlePriceChange);
  console.log("handlePriceChange:", minPrice);
  console.log("handlePriceChange:", priceRange);

  return (
    <nav className="product-filter">
 <Typography marginRight={35} variant="h4" gutterBottom>
        Products
      </Typography>
      <PriceSlider
        min={minPrice}
        max={maxPrice}
        value={priceRange}
        onChange={handlePriceChange}
      />
      <SortSection />
    </nav>
  );

  
   
};
