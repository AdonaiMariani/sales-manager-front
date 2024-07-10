import { Route, Routes } from "react-router-dom";
import EditInvoice from "../components/editInvoice/EditInvoice";
import InvoicePrint from "../components/invoicePrint/InvoicePrint";
import EditCustomer from "../components/editCustomer/EditCustomer";
import NewCustomer from "../components/newCustomer/NewCustomer";
import CustomerList from "../components/customerList/CustomerList";
import EditProduct from "../components/editProduct/EditProduct";
import NewProduct from "../components/newProduct/NewProduct";
import ProductList from "../components/productList/ProductsList";
import Home from "../components/home/Home";
import InvoiceList from "../components/invoiceList/InvoiceList";

import NewInvoice from "../components/NewInvoice/NewInvoice";

const AppRoutes = ({ customers, products, handleCreate }) => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/newProduct" element={<NewProduct />} />
      <Route path="/products/:id" element={<EditProduct />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/newCustomer" element={<NewCustomer />} />
      <Route path="/customers/:id" element={<EditCustomer />} />
      <Route path="/invoices" element={<InvoiceList />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage />} />
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
      <Route path="/invoices/:id" element={<EditInvoice />} />
      <Route path="/invoices/print/:id" element={<InvoicePrint />} />
    </Routes>
  );
};

export default AppRoutes;
