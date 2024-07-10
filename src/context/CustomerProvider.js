import { useState } from "react";
import { CustomerService } from "../services/CustomerService";
import CustomerContext from "./CustomerContext";
import { useNavigate } from "react-router-dom";

const customerService = new CustomerService();
const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [originalCustomer, setOriginalCustomer] = useState(null);
  const [formData, setFormData] = useState({
    Id: "",
    Name: "",
    Email: "",
    Phone: "",
  });
  const navigate = useNavigate();

  //CustomerList

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      customerService
        .deleteCustomer(customerId)
        .then(() => {
          const updatedCustomers = customers.filter(
            (customer) => customer.id !== customerId
          );
          setCustomers(updatedCustomers);
        })
        .catch((error) => console.error(error));
    }
  };

  //NewCustomer

  const handleInputChangeForm = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [errors, setErrors] = useState({});
  const validateAndSubmit = (event) => {
    event.preventDefault();

    let tempErrors = {};
    tempErrors.Name = formData.Name ? "" : "Name is required.";
    tempErrors.Address = formData.Address ? "" : "Brand is required.";
    tempErrors.Email = formData.Email ? "" : "Category is required.";
    tempErrors.Phone = formData.Phone ? "" : "Price is required.";
    setErrors(tempErrors);

    if (Object.values(tempErrors).every((x) => x === "")) {
      customerService
        .createCustomer({
          id: formData.Id,
          name: formData.Name,
          address: formData.Address,
          email: formData.Email,
          phone: formData.Phone,
        })
        .then(() => {
          alert("Customer created successfully");
          navigate("/customers");
          setFormData({
            Id: "",
            Name: "",
            Address: "",
            Email: "",
            Phone: "",
          });
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        errors,
        customers,
        originalCustomer,
        formData,
        searchTerm,
        setCustomer,
        setCustomers,
        setOriginalCustomer,
        setSearchTerm,
        handleDeleteCustomer,
        handleInputChangeForm,
        validateAndSubmit,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
