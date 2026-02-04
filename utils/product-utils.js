export const transformProducts = (
  allData,
  { category, priceRange, sortMethod },
) => {
  if (!allData) return [];

  // Filter by Category and Price
  const filtered = allData.filter((p) => {
    const matchesCategory = category === "All Items" || p.category === category;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  // Sort the filtered results
  return [...filtered].sort((a, b) => {
    switch (sortMethod) {
      case "Price: Low to High":
        return a.price - b.price;

      case "Price: High to Low":
        return b.price - a.price;

      case "Alphabetical: A–Z":
        return a.title.localeCompare(b.title);

      case "Alphabetical: Z–A":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });
};
