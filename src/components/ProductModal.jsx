// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
//   Box,
//   Alert,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { useContext } from "react";
// import { ShopContext } from "../ShopContext";

// export const ProductModal = ({ open, onClose, product }) => {
//   const isEdit = Boolean(product);
// const { categories } = useContext(ShopContext);

//   const [form, setForm] = useState({
//     title: "",
//     price: "",
//     image: "",
//     category: "",
//     description: "",
//   });

//   const [error, setError] = useState("");

//   // מילוי הטופס בעריכה / איפוס ביצירה
//   useEffect(() => {
//     if (product) {
//       setForm({
//         title: product.title ?? "",
//         price: product.price ?? "",
//         image: product.image ?? "",
//         category: product.category ?? "",
//         description: product.description ?? "",
//       });
//     } else {
//       setForm({
//         title: "",
//         price: "",
//         image: "",
//         category: "",
//         description: "",
//       });
//     }

//     setError("");
//   }, [product, open]);

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setError("");

//     const payload = {
//       ...form,
//       price: Number(form.price), // 🔥 חובה בגלל ולידציה ב־Backend
//     };

//     const url = isEdit
//       ? `http://localhost:3000/products/product/${product.id}`
//       : `http://localhost:3000/products`;

//     const method = isEdit ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(
//           typeof data === "string"
//             ? data
//             : data.message || data.data || "אירעה שגיאה",
//         );
//         return;
//       }

//       onClose();
//       window.location.reload(); // מספיק למטלה
//     } catch (err) {
//       setError("שגיאת תקשורת עם השרת");
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//   <DialogTitle >
//     {isEdit ? "Update a product" : "Add a product"}
//   </DialogTitle>

//   <DialogContent>
//     <Box
//       display="flex"
//       flexDirection="column"
//       gap={2}
//       mt={1}

//     >
//       {error && (
//         <Alert severity="error">
//           {error}
//         </Alert>
//       )}

//       <TextField
//         label="product name"
//         name="title"
//         value={form.title}
//         onChange={handleChange}
//         fullWidth
//       />

//       <TextField
//         label="price"
//         name="price"
//         type="number"
//         value={form.price}
//         onChange={handleChange}
//         fullWidth

//       />
// <FormControl fullWidth>
//   <InputLabel>Category</InputLabel>

//   <Select
//     value={form.category || ""}
//     label="Category"
//     onChange={(e) =>
//       setForm((prev) => ({
//         ...prev,
//         category: e.target.value,
//       }))
//     }
//   >
//     {categories
//       .filter((c) => c !== "All Items")
//       .map((category) => (
//         <MenuItem key={category} value={category}>
//           {category}
//         </MenuItem>
//       ))}
//   </Select>
// </FormControl>

//       <TextField
//         label="picture (URL)"
//         name="image"
//         value={form.image}
//         onChange={handleChange}
//         fullWidth
//       />

//       <TextField
//         label="description"
//         name="description"
//         value={form.description}
//         onChange={handleChange}
//         multiline
//         rows={3}
//         fullWidth
//       />

//       <Button variant="contained" onClick={handleSubmit}>
//         save
//       </Button>
//     </Box>
//   </DialogContent>
// </Dialog>
// );
// };

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAllProducts } from "../../hooks/useAllProducts";

export const ProductModal = ({ open, onClose, product }) => {
  const isEdit = Boolean(product);
  const queryClient = useQueryClient();

  // 🔹 כל המוצרים (לצורך קטגוריות)
  const { data: allProducts = [] } = useAllProducts();

  // 🔹 קטגוריות ייחודיות
  const categories = useMemo(() => {
    const unique = [...new Set(allProducts.map((p) => p.category))];
    return unique;
  }, [allProducts]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title ?? "",
        price: product.price ?? "",
        image: product.image ?? "",
        category: product.category ?? "",
        description: product.description ?? "",
      });
    } else {
      setForm({
        title: "",
        price: "",
        image: "",
        category: "",
        description: "",
      });
    }

    setError("");
  }, [product, open]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔹 mutation (create / update)
  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        price: Number(form.price),
      };

      const url = isEdit
        ? `http://localhost:3000/products/product/${product.id}`
        : `http://localhost:3000/products`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            data?.data ||
            (typeof data === "string" ? data : null) ||
            "Something went wrong",
        );
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-products"]);
      onClose();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = () => {
    setError("");
    mutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Update a product" : "Add a product"}</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Product name"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={form.category || ""}
              label="Category"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Picture (URL)"
            name="image"
            value={form.image}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
