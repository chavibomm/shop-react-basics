import { useContext } from "react";
import { ShopContext } from "../ShopContext";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const ProductCard = ({ id, img, itemName, price }) => {
  const navigate = useNavigate();

  const { cart, addOne, removeOne } = useContext(ShopContext);

  const quantity = cart[id] || 0;

  return (
    <div className="product-card"
      onClick={() => navigate(`/products/${id}`)}
      style={{ cursor: "pointer" }}
      >
      
      <div className="product-image">
        <img src={img} alt={itemName} />
      </div>


         <div className="quantity-controls">
         <IconButton
            onClick={(e) => {
              e.stopPropagation();
              removeOne(id);
            }}
            disabled={quantity === 0}
            color="error"
            size="small"
          >
            <RemoveIcon />
          </IconButton>

          <Typography>{quantity}</Typography>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              addOne(id);
            }}
            color="success"
            size="small"
          >
            <AddIcon />
          </IconButton>
      </div>


    <div className="product-info">
         {/* שם מוצר */}
        <Typography variant="subtitle1" gutterBottom>
          {itemName}
        </Typography>

        {/* מחיר */}
        <Typography variant="subtitle2" color="primary">
          ₪{price}
        </Typography>
      </div>
      
    </div>
  );
};
