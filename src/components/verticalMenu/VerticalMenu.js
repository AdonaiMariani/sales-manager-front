import { Link } from 'react-router-dom';
import './VerticalMenu.css';

const VerticalMenu = () => {
  return (
    <div className="vertical-menu">
      <Link to="/home" className="menu-link">Home</Link>
      <div className="dropdown">
        <button className="dropbtn">Products</button>
        <div className="dropdown-content">
          <Link to="/products" className="dropdown-link">See Products</Link>
          <Link to="/newProduct" className="dropdown-link">Add Product</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Customers</button>
        <div className="dropdown-content">
          <Link to="/customers" className="dropdown-link">See Customers</Link>
          <Link to="/newCustomer" className="dropdown-link">Add Customer</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Invoices</button>
        <div className="dropdown-content">
          <Link to="/invoices" className="dropdown-link">See Invoices</Link>
          <Link to="/newInvoice" className="dropdown-link">New Invoice</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Account</button>
        <div className="dropdown-content">
          <Link to="/" className="dropdown-link">Login</Link>
          <Link to="/register" className="dropdown-link">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default VerticalMenu;
