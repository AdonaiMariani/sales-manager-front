import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NewCustomer.css';
import CustomerContext from '../../context/CustomerContext';


const NewCustomer = () => {
  const {formData, handleInputChangeForm, handleSubmitForm} = useContext(CustomerContext)

  return (
    <div className="card">
      <div className="card-header">New Customer</div>
      <div className="card-body">
        <form onSubmit={handleSubmitForm}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="Name"
              id="Name"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Name}
              onChange={handleInputChangeForm}
            />
            <small id="helpId" className="text-muted">
              Insert name
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              name="Address"
              id="Address"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Address}
              onChange={handleInputChangeForm}
            />
            <small id="helpId" className="text-muted">
              Insert Address
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              name="Email"
              id="Email"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Email}
              onChange={handleInputChangeForm}
            />
            <small id="helpId" className="text-muted">
              Insert Email
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Phone</label>
            <input
              type="text"
              name="Phone"
              id="Phone"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Phone}
              onChange={handleInputChangeForm}
            />
            <small id="helpId" className="text-muted">
              Insert Phone
            </small>
          </div>
         
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-success">
              Add New Customer
            </button>
            <Link to={"/customers"} className="btn btn-primary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default NewCustomer;