import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "../customer/Customer";
import "./CustomerList.css";
import CustomerContext from "../../context/CustomerContext";
import { CustomerService } from "../../services/CustomerService";

const customerService = new CustomerService();
const CustomersList = () => {
  const {
    customers,
    setCustomers,
    searchTerm,
    setSearchTerm,
    handleDeleteCustomer,
  } = useContext(CustomerContext);
  useEffect(() => {
    customerService
      .getAllCustomers()
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3>Customers</h3>
        <Link className="btn btn-success" to="/newCustomer">
          New Customer
        </Link>
      </div>
      <div className="card-body">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
        />
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
            {customers
              .filter((customer) =>
                Object.values(customer).some((value) =>
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
              )
              .map((customer) => (
                <Customer
                  key={customer.id}
                  customer={customer}
                  handleDeleteCustomer={handleDeleteCustomer}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default CustomersList;
