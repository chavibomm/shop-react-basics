import { useParams, Link } from "react-router";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShopContext } from "../ShopContext";
import { fetchSingleProduct } from "../api/products-functions";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetails = () => {
  const { productId } = useParams();
  const { cart, addOne, removeOne } = useContext(ShopContext);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Typography>Loading product...</Typography>;
  if (isError) return <Typography>Error: {error.message}</Typography>;
  if (!product) return <Typography>Product not found</Typography>;

  const quantity = cart[product.id] || 0;

  return (
    <Box p={4}>
      <Button component={Link} to="/" variant="text">
        ← Back to shop
      </Button>

      <Card
        sx={{
          mt: 3,
          p: 3,
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: 350 },
            objectFit: "contain",
          }}
        />

        <Box>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            {product.category}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" color="primary" gutterBottom>
            {product.price} $
          </Typography>

          <Typography sx={{ mb: 3 }}>{product.description}</Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => removeOne(product.id)}
              disabled={quantity === 0}
              color="error"
            >
              <RemoveIcon />
            </IconButton>

            <Typography>{quantity}</Typography>

            <IconButton onClick={() => addOne(product.id)} color="success">
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetails;
