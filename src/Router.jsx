import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import { ShopContext } from "./ShopContext";

import App from "./Pages/App";
import ProductDetails from "./Pages/ProductDetails";
import AdminPage from "./Pages/AdminPage";

export const Router = () => {
  //  cart
  const [cart, setCart] = useState({});

  //  filters / sort
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortOption, setSortOption] = useState("");

  

  const addOne = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeOne = (id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      updated[id] === 1 ? delete updated[id] : updated[id]--;
      return updated;
    });
  };

  const router = createBrowserRouter([
    { path: "/", Component: App },
    { path: "/products/:productId", Component: ProductDetails },
    { path: "/admin", Component: AdminPage },
  ]);

  return (
    <ShopContext.Provider
      value={{
        // cart
        cart,
        addOne,
        removeOne,

        // filters
        selectedCategory,
        setSelectedCategory,

        priceRange,
        setPriceRange,

        sortOption,
        setSortOption,
      }}
    >
      <RouterProvider router={router} />
    </ShopContext.Provider>
  );
};
