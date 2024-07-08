import { useContext, useEffect } from "react";
import "./EditCustomer.css";
import CustomerContext from "../../context/CustomerContext";
import { CustomerService } from "../../services/CustomerService";
import { useNavigate, useParams } from "react-router-dom";

const customerService = new CustomerService();
const EditCustomer = () => {
  const { customer, originalCustomer, setCustomer, setOriginalCustomer } =
    useContext(CustomerContext);

  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (id) {
      // Asegúrate de que el id no sea undefined
      customerService
        .getCustomerById(id)
        .then((data) => {
          setCustomer(data);
          setOriginalCustomer(data);
        })
        .catch((error) => console.error(error));
    } else {
      console.error("Customer ID is undefined");
    }
  }, []);

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    console.log(customer.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(customer).filter(
      (key) => customer[key] !== originalCustomer[key]
    );
    const confirmMessage = changes
      .map((key) => `${key}: ${originalCustomer[key]} => ${customer[key]}`)
      .join("\n");
    if (
      window.confirm(
        `Are you sure you want to make these changes?\n\n${confirmMessage}`
      )
    ) {
      customerService
        .updateCustomer(id, customer)
        .then(() => {
          alert("Customer updated successfully");
          navigate("/customers");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="card">
      <div className="card-header">Edit Customer</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={customer.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
