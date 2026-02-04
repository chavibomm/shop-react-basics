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
    await fetch(
      `https://products-server-haxv.onrender.com/products/product/${id}`,
      {
        method: "DELETE",
      },
    );
    window.location.reload();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>
              <img
                src={p.image || "/placeholder.png"}
                alt={p.title}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                  borderRadius: 6,
                }}
              />
            </TableCell>
            <TableCell>{p.title}</TableCell>
            <TableCell>₪{p.price}</TableCell>
            <TableCell>{p.category}</TableCell>

            <TableCell>
              <IconButton onClick={() => onEdit(p)}>
                <EditIcon />
              </IconButton>

              <IconButton color="error" onClick={() => handleDelete(p.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
