// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import './VerticalMenu.css' ;

// function VerticalNavMenu() {
//   return (
//     <Nav className="flex-column bg-light">
//       <Nav.Item>
//         <Nav.Link href="#item1">Item 1</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link href="#item2">Item 2</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link href="#item3">Item 3</Nav.Link>
//       </Nav.Item>
//     </Nav>
//   );
// }

// export default VerticalNavMenu;
import { Link } from 'react-router-dom';
import './VerticalMenu.css';
const VerticalMenu = () =>{
  return (
    <div className="vertical-menu">
      <Link to="/">Home</Link>
      <div className="dropdown">
        <button className="dropbtn">Products</button>
        <div className="dropdown-content">
          <Link to="/">See Products</Link>
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
    </div>
  );
}

export default VerticalMenu;