import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product, handleDeleteProduct }) => {
  return (
    <tr>
      <td>{product.id}</td>
      {/* <td>{product.name}</td> */}
      <td className="name-column">{product.name}</td>
      <td>{product.brand}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td className="button-container">
        <Link className="btn btn-primary" to={`/products/${product.id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Product;