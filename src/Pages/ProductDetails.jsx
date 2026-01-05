import { useParams, Link } from "react-router";
import { useContext } from "react";
import { ShopContext } from "../ShopContext";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  Divider
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// const ProductDetails = () => {
//   const { productId } = useParams();

//   const { products, cart, addOne, removeOne } = useContext(ShopContext);

//   const product = products.find((p) => p.id === Number(productId));

//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   const quantity = cart[product.id] || 0;

//   return (
//     <div className="product-details">
//       <Link to="/"> home </Link>

//       <div className="details-layout">
//         <img src={product.image} alt={product.title} />

//         <div className="details-info">
//           <h1>{product.title}</h1>
//           <p className="category">{product.category}</p>

//           <h2>${product.price}</h2>

//           <p className="description">{product.description}</p>

//           <div className="quantity-controls">
//             <button
//               onClick={() => removeOne(product.id)}
//               disabled={quantity === 0}
//             >
//               -
//             </button>
//             <span>{quantity}</span>
//             <button onClick={() => addOne(product.id)}>+</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div>{productId}</div>
//       <div>
//         {" "}
//         <Link to="/">Back to shop</Link>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
const ProductDetails = () => {
  const { productId } = useParams();
  const { products, cart, addOne, removeOne } = useContext(ShopContext);

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  const quantity = cart[product.id] || 0;

  return (
    <Box p={4}>
      {/* חזרה לחנות */}
      <Button component={Link} to="/" variant="text">
        ← חזרה לחנות
      </Button>

      <Card
        sx={{
          mt: 3,
          p: 3,
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" }
        }}
      >
        {/* תמונה */}
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: 350 },
            objectFit: "contain"
          }}
        />

        {/* פרטי מוצר */}
        <Box>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            {product.category}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" color="primary" gutterBottom>
            ₪{product.price}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {/* כמות */}
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => removeOne(product.id)}
              disabled={quantity === 0}
              color="error"
            >
              <RemoveIcon />
            </IconButton>

            <Typography>{quantity}</Typography>

            <IconButton
              onClick={() => addOne(product.id)}
              color="success"
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetails;
