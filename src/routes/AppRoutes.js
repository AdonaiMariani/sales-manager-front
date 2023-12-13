import { Route, Routes } from "react-router-dom";

import EditCustomer from "../components/editCustomer/EditCustomer";
import NewCustomer from "../components/newCustomer/NewCustomer";
import CustomersList from "../components/customerList/CustomerList";
import EditProduct from "../components/editProduct/EditProduct";
import NewProduct from "../components/newProduct/NewProduct";
import ProductsList from "../components/productList/ProductsList";
import Home from "../components/home/Home";

import NewInvoice from "../components/NewInvoice/NewInvoice";

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
        path="/newInvoice"
        element={
          <NewInvoice
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
