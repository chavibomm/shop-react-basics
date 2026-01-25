// import { createBrowserRouter, RouterProvider } from "react-router";
// import App from "./Pages/App";
// import { useEffect, useState, useMemo } from "react";
// import { ShopContext } from "./ShopContext";
// import ProductDetails from "./Pages/ProductDetails";
// import AdminPage from "./Pages/AdminPage";


// export const Router = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [cart, setCart] = useState({});
//   const [sortOption, setSortOption] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All Items");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);
//   const [priceRange, setPriceRange] = useState([0, 0]);

//   useEffect(() => {
//     const handleProducts = async () => {
//       // const response = await fetch("https://fakestoreapi.com/products");
//       const response = await fetch("http://localhost:3000/products");

//       const data = await response.json();
//       const mappedProducts = data.map((product) => ({
//         ...product,
//         id: product._id, // 👈 מיפוי קריטי
//       }));

//       setProducts(mappedProducts);
//     };

//     handleProducts();
//   }, []);

//   useEffect(() => {
//     console.log("cart changed:", cart);
//   }, [cart]);

//   useEffect(() => {
//     const cat = products
//       ?.map((p) => p.category)
//       .filter((value, index, array) => array.indexOf(value) === index);

//     if (cat && cat.length > 0) {
//       cat.unshift("All Items");
//       setCategories(cat);
//     }
//   }, [products]);

//   const addOne = (id) => {
//     setCart((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 0) + 1,
//     }));
//   };

//   const removeOne = (id) => {
//     setCart((prev) => {
//       if (!prev[id]) return prev;

//       const updated = { ...prev };
//       if (updated[id] === 1) {
//         delete updated[id];
//       } else {
//         updated[id]--;
//       }
//       return updated;
//     });
//   };

//   useEffect(() => {
//     if (!products.length) return;

//     const prices = products.map((p) => p.price);
//     const min = Math.min(...prices);
//     const max = Math.max(...prices);

//     setMinPrice(min);
//     setMaxPrice(max);
//     setPriceRange([min, max]); // טווח התחלתי
//   }, [products]);

//   const filteredProducts = useMemo(() => {
//     let result = [...products];

//     if (selectedCategory !== "All Items") {
//       result = result.filter((p) => p.category === selectedCategory);
//     }

//     const [min, max] = priceRange;
//     result = result.filter((p) => p.price >= min && p.price <= max);

//     switch (sortOption) {
//       case "Alphabetically, A-Z":
//         result.sort((a, b) => a.title.localeCompare(b.title));
//         break;

//       case "Alphabetically, Z-A":
//         result.sort((a, b) => b.title.localeCompare(a.title));
//         break;

//       case "Price, low to high":
//         result.sort((a, b) => a.price - b.price);
//         break;

//       case "Price, high to low":
//         result.sort((a, b) => b.price - a.price);
//         break;
//     }

//     return result;
//   }, [products, selectedCategory, priceRange, sortOption]);

//   const handleCatChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const handlePriceChange = (range) => {
//     setPriceRange(range);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       Component: App,
//     },
//     {
//       path: "/products/:productId",
//       Component: ProductDetails,
//     },
//     {
//       path: "/admin",
//       Component: AdminPage,
//     },
//   ]);

//   return (
//     <ShopContext.Provider
//       value={{
//         products: filteredProducts,
//         categories,
//         cart,
//         addOne,
//         removeOne,

//         minPrice,
//         maxPrice,
//         priceRange,
//         handlePriceChange,

//         handleCatChange,
//         handleSortChange,
//       }}
//     >
//       <RouterProvider router={router} />
//     </ShopContext.Provider>
//   );
// };



import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import { ShopContext } from "./ShopContext";

import App from "./Pages/App";
import ProductDetails from "./Pages/ProductDetails";
import AdminPage from "./Pages/AdminPage";

export const Router = () => {
  // 🛒 cart
  const [cart, setCart] = useState({});

  // 🔎 filters / sort
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
