export const handleProducts = async () => {
  const response = await fetch("https://products-server-haxv.onrender.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.map((product) => ({
    ...product,
    id: product._id,
  }));
};


export const fetchSingleProduct = async (id) => {
  const response = await fetch(
    `https://products-server-haxv.onrender.com/products/product/${id}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const product = await response.json();

  return {
    ...product,
    id: product._id,
  };
};
