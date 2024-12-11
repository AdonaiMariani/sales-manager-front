import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";

export function useFilters() {
  const { filter, setFilter, products, searchTerm } =
    useContext(ProductsContext);

  // Filtra productos por precio mínimo y categoría
  const applyFilters = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filter.minPrice &&
        (filter.category.toLowerCase() === "all" ||
          product.category.toLowerCase() === filter.category)
      );
    });
  };

  // Combina el filtro de búsqueda con los filtros adicionales
  const filteredProducts = applyFilters(
    products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  // Manejador para cambio de categoría
  const handleCategoryChange = (event) => {
    setFilter({ ...filter, category: event.target.value });
  };

  // Manejador para cambio en precio mínimo
  const handleMinPriceChange = (event) => {
    const newMinPrice = parseFloat(event.target.value);
    setFilter({ ...filter, minPrice: !isNaN(newMinPrice) ? newMinPrice : 0 });
  };

  return {
    filter,
    setFilter,
    filteredProducts,
    handleCategoryChange,
    handleMinPriceChange,
  };
}
