import { createContext, useState } from "react";
import { ProductService } from "../services/ProductService";
import { useNavigate } from "react-router-dom";

const productService = new ProductService();

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: "all",
    minPrice: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productService
        .deleteProduct(productId)
        .then(() => {
          const updatedProducts = products.filter(
            (product) => product.id !== productId
          );
          setProducts(updatedProducts);
        })
        .catch((error) => console.error(error));
    }
  };
  const [formData, setFormData] = useState({
    Id: "",
    Name: "",
    Brand: "",
    Category: "",
    Price: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const [errors, setErrors] = useState({});
  const validateAndSubmit = (event) => {
    event.preventDefault();

    let tempErrors = {};
    tempErrors.Name = formData.Name ? "" : "Name is required.";
    tempErrors.Brand = formData.Brand ? "" : "Brand is required.";
    tempErrors.Category = formData.Category ? "" : "Category is required.";
    tempErrors.Price = formData.Price ? "" : "Price is required.";
    setErrors(tempErrors);

    if (Object.values(tempErrors).every((x) => x === "")) {
      productService
        .createProduct({
          id: formData.Id,
          name: formData.Name,
          brand: formData.Brand,
          category: formData.Category,
          price: formData.Price,
        })
        .then(() => {
          alert("Product created successfully");
          navigate("/products");
          setFormData({
            Id: "",
            Name: "",
            Brand: "",
            Category: "",
            Price: "",
          });
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <ProductsContext.Provider
      value={{
        products,
        filter,
        searchTerm,
        formData,
        errors,
        setFormData,
        setProducts,
        setFilter,
        setSearchTerm,
        handleDeleteProduct,
        handleInputChange,
        validateAndSubmit,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
