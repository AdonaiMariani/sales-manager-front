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
    if (window.confirm("Estas seguro que quieres eliminar este producto?")) {
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
    tempErrors.Name = formData.Name ? "" : "Ingrese el Nombre.";
    tempErrors.Brand = formData.Brand ? "" : "Ingrese la Marca";
    tempErrors.Category = formData.Category ? "" : "Ingrese la Categoria";
    tempErrors.Price = formData.Price ? "" : "Ingrese el precio";
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
          alert("Producto creado exitosamente");
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
