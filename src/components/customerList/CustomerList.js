import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomerService } from '../../services/CustomerService';
import Customer from '../customer/Customer';
import './CustomerList.css';
const customerService = new CustomerService();

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    customerService.getAllCustomers()
      .then(data => setCustomers(data))
      .catch(error => console.error(error));
  }, []);

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

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3>Customers</h3>
        <Link className="btn btn-success" to="/newCustomer">New Customer</Link>
      </div>
      <div className="card-body">
        <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search..." />
        <table className="table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th className="id-column">ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              {/* <th>Email</th> */}
              <th className="email-column">Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.filter(customer => 
              Object.values(customer).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )
            ).map((customer) => (
              <Customer key={customer.id} customer={customer} handleDeleteCustomer={handleDeleteCustomer} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default CustomersList;