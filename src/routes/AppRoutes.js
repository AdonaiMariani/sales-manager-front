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
import LoginPage from "../components/auth/pages/LoginPage";
import UserList from "../components/userList/UserList";
import NewUser from "../newUser/NewUser";
import EditProfile from "../components/editProfile/EditProfile";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (localStorage.getItem("role") !== "ROLE_ADMIN") {
    console.log(user);
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return children;
};

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/newInvoice" element={<NewInvoice />} />
      <Route path="/invoices/:id" element={<EditInvoice />} />
      <Route path="/invoices/print/:id" element={<InvoicePrint />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route path="/invoices/:id" element={<EditInvoice />} />
      <Route path="/invoices/print/:id" element={<InvoicePrint />} />
      <Route path="/*" element={<Home />} />
      <Route
        path="/newUser"
        element={
          <ProtectedRoute>
            <NewUser />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<EditProfile />} />
    </Routes>
  );
};

export default AppRoutes;
