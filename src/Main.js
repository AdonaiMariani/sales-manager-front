import React from "react";
import App from "./App";
import { ProductsProvider } from "./context/ProductContext";
import CustomerProvider from "./context/CustomerProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { UsersProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

const Main = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UsersProvider>
          <CustomerProvider>
            <DataProvider>
              <ProductsProvider>
                <App />
              </ProductsProvider>
            </DataProvider>
          </CustomerProvider>
        </UsersProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Main;
