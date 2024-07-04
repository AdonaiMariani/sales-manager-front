import { useContext } from 'react';
import './EditCustomer.css';
import CustomerContext from '../../context/CustomerContext';


const EditCustomer = () => {
   const {customer, handleInputChange, handleSubmit} = useContext(CustomerContext)
 
  return (
    <div className="card">
      <div className="card-header">Edit Customer</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={customer.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" name="address" value={customer.address} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" className="form-control" name="phone" value={customer.phone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email" value={customer.email} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;