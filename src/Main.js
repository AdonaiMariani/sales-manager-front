import React from "react";
import App from "./App";
import { ProductsProvider } from "./context/ProductContext";
import CustomerProvider from "./context/CustomerProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { UsersProvider } from "./context/UserContext";

const Main = () => {
  return (
    <ThemeProvider>
      <UsersProvider>
        <CustomerProvider>
          <DataProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </DataProvider>
        </CustomerProvider>
      </UsersProvider>
    </ThemeProvider>
  );
};

export default Main;
