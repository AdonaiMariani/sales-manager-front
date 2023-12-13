import { Route, Routes } from "react-router-dom";
import CreateInvoiceForm from "../components/createInvoiceForm/CreateInvoiceForm";
import EditCustomer from "../components/editCustomer/EditCustomer";
import NewCustomer from "../components/newCustomer/NewCustomer";
import CustomersList from "../components/customerList/CustomerList";
import EditProduct from "../components/editProduct/EditProduct";
import NewProduct from "../components/newProduct/NewProduct";
import ProductsList from "../components/productList/ProductsList";
import Home from "../components/home/Home";
import LoginPage from "../components/auth/pages/LoginPage";

const AppRoutes = ({ customers, products, handleCreate }) => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<ProductsList />} />
      <Route path="/newProduct" element={<NewProduct />} />
      <Route path="/products/:id" element={<EditProduct />} />
      <Route path="/customers" element={<CustomersList />} />
      <Route path="/newCustomer" element={<NewCustomer />} />
      <Route path="/customers/:id" element={<EditCustomer />} />
      {/* <Route path="/createInvoice" element={<CreateInvoiceForm onCreate={handleCreate} />} /> Nueva ruta para el formulario de creación de facturas */}
      <Route
        path="/createInvoice"
        element={
          <CreateInvoiceForm
            customers={customers}
            products={products}
            onCreate={handleCreate}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
