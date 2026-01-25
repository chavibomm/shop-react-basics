import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const ProductsTable = ({ products, onEdit }) => {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/products/product/${id}`, {
      method: "DELETE",
    });
    window.location.reload(); // פשוט למשימה
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.title}</TableCell>
            <TableCell>₪{p.price}</TableCell>
            <TableCell>{p.category}</TableCell>

            <TableCell>
              <IconButton onClick={() => onEdit(p)}>
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => handleDelete(p.id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
