import React from "react";
import App from "./App";
import { ProductsProvider } from "./context/ProductContext";
import CustomerProvider from "./context/CustomerProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

const Main = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <ProductsProvider>
          <CustomerProvider>
            <App />
          </CustomerProvider>
        </ProductsProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default Main;
