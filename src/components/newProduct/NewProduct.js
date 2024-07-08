import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/ProductService' // Importa el servicio
import './NewProduct.css';
const productService = new ProductService(); // Crea una instancia del servicio

const NewProduct = () => {
  const [formData, setFormData] = useState({ Id: '', Name: '', Brand: '', Category: '', Price: '' });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    productService.createProduct({ // Utiliza el método createProduct del servicio
      id: formData.Id,
      name: formData.Name,
      brand: formData.Brand,
      category: formData.Category,
      price: formData.Price,
    })
    .then(() => {
      alert('Product created successfully'); // Muestra un mensaje de éxito
      navigate('/products');
    })
    .catch(error => console.error(error));
  };


  return (
    <div className="card">
      <div className="card-header">New Product</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
            />
            <small id="helpId" className="text-muted">
              Insert name
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Brand">Brand</label>
            <input
              type="text"
              name="Brand"
              id="Brand"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Brand}
              onChange={handleInputChange}
            />
            <small id="helpId" className="text-muted">
              Insert Brand
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Category">Category</label>
            <input
              type="text"
              name="Category"
              id="Category"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Category}
              onChange={handleInputChange}
            />
            <small id="helpId" className="text-muted">
              Insert Category
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="Price">Price</label>
            <input
              type="text"
              name="Price"
              id="Price"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Price}
              onChange={handleInputChange}
            />
            <small id="helpId" className="text-muted">
              Insert Price
            </small>
          </div>
         
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-success">
              Add New Product
            </button>
            <Link to={"/"} className="btn btn-primary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default NewProduct;