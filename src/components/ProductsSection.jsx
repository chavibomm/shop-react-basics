import { useProducts } from "../hooks/useProducts.js";
import { ProductCard } from "./ProductCard";

export const ProductsSection = () => {
  const { data: products , isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <section className="products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          itemName={product.title}
          price={product.price}
          img={product.image}
        />
      ))}
    </section>
  );
};
