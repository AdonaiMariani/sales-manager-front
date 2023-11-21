import React from 'react';
import { Link } from 'react-router-dom';
import './Customer.css';

const Customer = ({ customer, handleDeleteCustomer }) => {
  return (
    <tr>
      {/* <td>{customer.id}</td> */}
      <td className="id-column">{customer.id}</td>
      <td className="name-column">{customer.name}</td>
      <td>{customer.address}</td>
      <td>{customer.phone}</td>
      {/* <td>{customer.email}</td> */}
      <td className="email-column">{customer.email}</td>
      <td className="button-container">
        <Link className="btn btn-primary" to={`/customers/${customer.id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Customer;