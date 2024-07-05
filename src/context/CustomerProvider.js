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

  //CustomerEdit

  //NewCustomer
  const handleSubmitForm = (event) => {
    event.preventDefault();
    customerService
      .createCustomer({
        // Utiliza el método createCustomer del servicio
        id: formData.Id,
        name: formData.Name,
        address: formData.Address,
        email: formData.Email,
        phone: formData.Phone,
      })
      .then(() => {
        alert("Customer created successfully"); // Muestra un mensaje de éxito
        navigate("/customers");
      })
      .catch((error) => console.error(error));
  };

  const handleInputChangeForm = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
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
        handleSubmitForm,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
