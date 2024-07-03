import { Link } from 'react-router-dom';
import './VerticalMenu.css';

const VerticalMenu = () => {
  return (
    <div className="vertical-menu">
      <Link to="/">Home</Link>
      <div className="dropdown">
        <button className="dropbtn">Products</button>
        <div className="dropdown-content">
          <Link to="/products">See Products</Link>
          <Link to="/newProduct">Add Product</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Customers</button>
        <div className="dropdown-content">
          <Link to="/customers">See Customers</Link>
          <Link to="/newCustomer">Add Customer</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Invoices</button>
        <div className="dropdown-content">
          <Link to="/invoices">See Invoices</Link>
          <Link to="/newInvoice">New Invoice</Link>
        </div>
      </div>
    </div>
  );
}

export default VerticalMenu;