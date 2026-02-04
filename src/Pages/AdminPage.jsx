import { useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ProductsTable } from "../components/ProductsTable";
import { ProductModal } from "../components/ProductModal";
import { useAllProducts } from "../../hooks/useAllProducts";

const AdminPage = () => {
  //  כל המוצרים מהשרת (TanStack)
  const {
    data: products = [],
    isLoading,
    isError,
  } = useAllProducts();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = () => {
    setSelectedProduct(null); // יצירה
    setOpenModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // עריכה
    setOpenModal(true);
  };

  if (isLoading) {
    return <Typography>Loading products...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading products</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Admin – Products
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Add a product
      </Button>

      <ProductsTable
        products={products}
        onEdit={handleEdit}
      />

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        product={selectedProduct}
      />
    </Box>
  );
};

export default AdminPage;
