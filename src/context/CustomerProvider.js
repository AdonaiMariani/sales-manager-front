import { useEffect, useState } from "react";
import { CustomerService } from "../services/CustomerService";
import CustomerContext from "./CustomerContext";
import { useNavigate, useParams } from "react-router-dom";

const customerService = new CustomerService()
const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    
  });
  const [originalCustomer, setOriginalCustomer] = useState(null);
  const [formData, setFormData] = useState({ Id: '', Name: '', Email: '', Phone: '' });
  const { id } = useParams();
  const navigate = useNavigate();


  //CustomerList
  useEffect(() => {
    customerService.getAllCustomers()
      .then(data => setCustomers(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    customerService.getCustomerById(id)
      .then(data => {
        setCustomer(data);
        setOriginalCustomer(data);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      customerService.deleteCustomer(customerId)
        .then(() => {
          const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
          setCustomers(updatedCustomers);
        })
        .catch(error => console.error(error));
    }
  };


  //CustomerEdit
  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(customer).filter(key => customer[key] !== originalCustomer[key]);
    const confirmMessage = changes.map(key => `${key}: ${originalCustomer[key]} => ${customer[key]}`).join('\n');
    if (window.confirm(`Are you sure you want to make these changes?\n\n${confirmMessage}`)) {
      customerService.updateCustomer(id, customer)
        .then(() => {
          alert('Customer updated successfully');
          navigate('/customers');
        })
        .catch(error => console.error(error));
    }
  };  


  //NewCustomer
  const handleSubmitForm = (event) => {
    event.preventDefault();
    customerService.createCustomer({ // Utiliza el método createCustomer del servicio
      id: formData.Id,
      name: formData.Name,
      address: formData.Address,
      email: formData.Email,
      phone: formData.Phone,
    })
    .then(() => {
      alert('Customer created successfully'); // Muestra un mensaje de éxito
      navigate('/customers');
    })
    .catch(error => console.error(error));
  };

  const handleInputChangeForm = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  return(
    <CustomerContext.Provider value={
      {
      customer,
      customers,
      formData,
      searchTerm,
      setCustomers,
      setSearchTerm, 
      handleDeleteCustomer, 
      handleInputChange, 
      handleInputChangeForm, 
      handleSubmit, 
      handleSubmitForm,
    }}>
        {children}
    </CustomerContext.Provider>
  )
};

export default CustomerProvider 