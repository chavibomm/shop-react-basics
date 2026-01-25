import { useContext } from "react";
import { Box, Typography, IconButton, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ShopContext } from "../ShopContext";
import { useAllProducts } from "../../hooks/useAllProducts";

export const CartDrawer = () => {
  const { cart, addOne, removeOne } = useContext(ShopContext);

  // 🔹 כל המוצרים מהשרת (לא מסוננים!)
  const { data: allProducts = [] } = useAllProducts();

  // 🔹 בניית פריטי העגלה
  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = allProducts.find((p) => p.id === id);
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Box width={360} p={2}>
      <Typography variant="h6" gutterBottom>
        My Cart
      </Typography>

      {cartItems.map((item) => (
        <Box
          key={item.id}
          display="flex"
          gap={2}
          mb={2}
          p={1}
          border="1px solid #ddd"
          borderRadius={2}
        >
          <img src={item.image} width={60} />

          <Box flex={1}>
            <Typography variant="body1">{item.title}</Typography>

            <Typography variant="body2">
              {item.price * item.quantity} $
            </Typography>

            <Box display="flex" alignItems="center">
              <IconButton onClick={() => removeOne(item.id)}>
                <RemoveIcon />
              </IconButton>

              <Typography>{item.quantity}</Typography>

              <IconButton onClick={() => addOne(item.id)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}

      <Divider />

      <Box mt={2}>
        <Typography variant="h6">Total: {total.toFixed(2)} $</Typography>

        <Button fullWidth variant="contained" sx={{ mt: 1 }} disabled>
          Payment
        </Button>
      </Box>
    </Box>
  );
};
