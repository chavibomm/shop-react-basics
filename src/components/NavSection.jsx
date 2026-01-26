import { useContext, useEffect, useMemo, useState } from "react";
import { PriceSlider } from "./PriceSlider";
import { SortSection } from "./SortSection";
import { ShopContext } from "../ShopContext";
import { Box, Typography, IconButton, Drawer } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartDrawer } from "./CartDrawer";
import { useProducts } from "../../hooks/useProducts";
import { FilterSortComp } from "./FilterSortComp";
import { useAllProducts } from "../../hooks/useAllProducts";



export const NavSection = () => {
  const [openCart, setOpenCart] = useState(false);

  const { priceRange, setPriceRange } = useContext(ShopContext);

  const { data: allProducts = [] } = useAllProducts();
    // const { data: allProducts = [] } = useProducts();


    const categories = [
    "All Items",
    ...new Set(allProducts.map((p) => p.category)),
  ];




  // טווח מחירים – מכל המוצרים
  const prices = allProducts.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;


  useEffect(() => {
  // אתחול חד-פעמי של הסליידר
  if (
    priceRange[0] === 0 &&
    priceRange[1] === Infinity &&
    minPrice !== maxPrice
  ) {
    setPriceRange([minPrice, maxPrice]);
  }
}, [minPrice, maxPrice]);


  return (
    <>
      {/* HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={3}
        py={0}
      >
        <Typography variant="h4" sx={{ mt: 3, mb: 0 }}>
          Products
        </Typography>

        <IconButton onClick={() => setOpenCart(true)}>
          <ShoppingCartIcon />
        </IconButton>
      </Box>

      {/* FILTERS */}
      <nav className="product-filter">
        <SortSection
          categories={categories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </nav>

      {/* CART */}
      <Drawer anchor="left" open={openCart} onClose={() => setOpenCart(false)}>
        <CartDrawer />
      </Drawer>
    </>
  );
};