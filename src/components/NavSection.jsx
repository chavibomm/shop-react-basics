import { useContext, useEffect, useMemo, useState } from "react";
import { SortSection } from "./SortSection";
import { ShopContext } from "../ShopContext";
import { Box, Typography, IconButton, Drawer, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartDrawer } from "./CartDrawer";
import { useAllProducts } from "../hooks/useAllProducts";
import { useNavigate } from "react-router";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const NavSection = () => {
  const navigate = useNavigate();

  const [openCart, setOpenCart] = useState(false);

  const { priceRange, setPriceRange, cart } = useContext(ShopContext);

  const { data: allProducts = [] } = useAllProducts();

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const categories = useMemo(() => {
    if (allProducts.length === 0) return ["All Items"];

    return ["All Items", ...new Set(allProducts.map((p) => p.category))];
  }, [allProducts.length > 0]);

  // טווח מחירים – מכל המוצרים
  const prices = allProducts.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  useEffect(() => {
    if (
      allProducts.length > 0 &&
      priceRange[0] === 0 &&
      priceRange[1] === Infinity
    ) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [allProducts.length]);

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
        <Box>
          <IconButton onClick={() => setOpenCart(true)}>
            <Badge
              badgeContent={cartCount}
              color="error"
              overlap="circular"
              invisible={cartCount === 0}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={() => navigate("/admin")}>
            <AdminPanelSettingsIcon />
          </IconButton>
        </Box>
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
