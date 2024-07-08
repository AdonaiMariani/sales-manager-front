import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";

export function useFilters() {
  const { filter, setFilter, products, searchTerm } =
    useContext(ProductsContext);
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filter.minPrice &&
        (filter.category.toLowerCase() === "all" ||
          product.category.toLowerCase() === filter.category)
      );
    });
  };
  const filteredProducts = filterProducts(
    products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );
  const handleCategoryChange = (event) => {
    setFilter({ ...filter, category: event.target.value });
  };

  const handleMinPriceChange = (event) => {
    setFilter({ ...filter, minPrice: parseFloat(event.target.value) || 0 });
  };

  return {
    filter,
    setFilter,
    filteredProducts,
    handleCategoryChange,
    handleMinPriceChange,
  };
}
