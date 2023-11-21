//CÓDIGO SIN FUNCIONALIDAD
// import React from 'react';
// const EditProduct = (props) => {



//     return (
//       <div className="card">
//         <div className="card-header">
//             Edit Product
//         </div>
//         <div className="card-body">
//             <h4 className="card-title">Title</h4>
//             <p className="card-text">Text</p>
//         </div>
//         <div className="card-footer text-muted">
//             Footer
//         </div>
//       </div>
//     );
//   };
  
//   export default EditProduct;

//CÓDIGO CON FUNCIONALIDAD
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom'; // Importa Link
// import { data } from '../public/data/MOCK_DATA';

// const EditProduct = () => {
//   const { code } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     console.log("Product code to edit:", code);
//     const productToEdit = data.find((item) => item.code === code);
//     console.log('Product to edit:', productToEdit); // Agrega este console.log
//     setProduct(productToEdit);
//   }, [code]);

//   const handleSave = () => {
//     // Implementa aquí la lógica para guardar los cambios del producto
//     // Esto podría requerir una función que actualice los datos en `data` o en tu base de datos.
//   };

//   if (!product) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div>
//       <h2>Edit Product</h2>
//       <Link to="/">Back to Product List</Link>

//       {/* El contenido del formulario de edición */}
//       <form>
//         <div>
//           <label>Code</label>
//           <input type="text" value={product.code} readOnly />
//         </div>
//         <div>
//           <label>Name</label>
//           <input type="text" value={product.name} />
//         </div>
//         <div>
//           <label>Brand</label>
//           <input type="text" value={product.brand} />
//         </div>
//         <div>
//           <label>Price</label>
//           <input type="text" value={product.price} />
//         </div>
//       </form>

//       {/* Un botón o enlace para guardar los cambios */}
//       <button onClick={handleSave}>Save Changes</button>
//     </div>
//   );
// };

// export default EditProduct;
// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory, useNavigate } from 'react-router-dom';
// import { data } from '../public/data/MOCK_DATA';

// let productsData = data;
// const EditProduct = () => {
//   const { code } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     code: '',
//     name: '',
//     brand: '',
//     price: ''
//   });

//   useEffect(() => {
//     const productToEdit = data.find((product) => product.code === code);
//     setProduct(productToEdit);
//   }, [code]);

//   const handleChange = (event) => {
//     setProduct({
//       ...product,
//       [event.target.name]: event.target.value
//     });
//   };
// //PARA CUANDO YA TENGA API
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   // Aquí puedes hacer la llamada a la API para actualizar el producto
//   //   console.log(product);
//   //   history.push('/products');
//   // };

//   //SIN API
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Simulamos la actualización del producto en los datos
//     const updatedProducts = productsData.map((prod) => prod.code === product.code ? product : prod);
//     productsData = updatedProducts;
//     history.push('/products');
//   };

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { data } from '../public/data/MOCK_DATA';

// let productsData = data; // Hacemos una copia de los datos para poder modificarlos

// const EditProduct = () => {
//   const { code } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     code: '',
//     name: '',
//     brand: '',
//     price: ''
//   });

//   // useEffect(() => {
//   //   const productToEdit = productsData.find((product) => product.code === code);
//   //   setProduct(productToEdit);
//   // }, [code]);
//   useEffect(() => {
//     const productToEdit = productsData.find((product) => product.code === code);
//     if (productToEdit) {
//       setProduct(productToEdit);
//     } else {
//       // Redirige al usuario a la página de productos si el producto no se encuentra
//       navigate('/');
//     }
//   }, [code, navigate]);

//   const handleChange = (event) => {
//     setProduct({
//       ...product,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Simulamos la actualización del producto en los datos
//     const updatedProducts = productsData.map((prod) => prod.code === product.code ? product : prod);
//     productsData = updatedProducts;
//     navigate('/');
//   };

//   return (
//     <div className="card">
//       <div className="card-header">Edit Product</div>
//       <div className="card-body">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Code</label>
//             <input type="text" className="form-control" name="code" value={product.code} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Name</label>
//             <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Brand</label>
//             <input type="text" className="form-control" name="brand" value={product.brand} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label>Price</label>
//             <input type="text" className="form-control" name="price" value={product.price} onChange={handleChange} />
//           </div>
//           <button type="submit" className="btn btn-primary">Save</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;

//CÓDIGO CON API
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ProductService } from '../services/ProductService' // Importa el servicio

// const productService = new ProductService(); // Crea una instancia del servicio

// // const EditProduct = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [product, setProduct] = useState({
// //     id: '',
// //     name: '',
// //     brand: '',
// //     category: '',
// //     price: ''
// //   });

// //   useEffect(() => {
// //     fetch(`http://localhost:8080/products/${id}`)
// //       .then(response => response.json())
// //       .then(data => setProduct(data))
// //       .catch(error => console.error(error));
// //   }, [id]);

// //   const handleInputChange = (event) => {
// //     setProduct({ ...product, [event.target.name]: event.target.value });
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     fetch(`http://localhost:8080/products/${id}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(product),
// //     })
// //       .then(response => {
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         return response.json();
// //       })
// //       .then(() => {
// //         navigate('/products');
// //       })
// //       .catch(error => console.error(error));
// //   };
// const EditProduct = () => {
//   const [product, setProduct] = useState({ Id: '', Name: '', Brand: '', Category: '', Price: '' });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     productService.getProductById(id) // Utiliza el método getProductById del servicio
//       .then(data => setProduct(data))
//       .catch(error => console.error(error));
//   }, [id]);

//   const handleInputChange = (event) => {
//     setProduct({ ...product, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     productService.updateProduct(id, product) // Utiliza el método updateProduct del servicio
//       .then(() => {
//         navigate('/products');
//       })
//       .catch(error => console.error(error));
//   };
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import './EditProduct.css';
const productService = new ProductService();

const EditProduct = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    brand: '',
    category: '',
    price: '',
  });
  const [originalProduct, setOriginalProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    productService.getProductById(id)
      .then(data => {
        setProduct(data);
        setOriginalProduct(data);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(product).filter(key => product[key] !== originalProduct[key]);
    const confirmMessage = changes.map(key => `${key}: ${originalProduct[key]} => ${product[key]}`).join('\n');
    if (window.confirm(`Are you sure you want to make these changes?\n\n${confirmMessage}`)) {
      productService.updateProduct(id, product)
        .then(() => {
          alert('Product updated successfully');
          navigate('/');
        })
        .catch(error => console.error(error));
    }
  };  
  return (
    <div className="card">
      <div className="card-header">Edit Product</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Id</label>
            {/* <input type="text" className="form-control" name="id" value={product.id} onChange={handleInputChange} /> */}
            <input type="text" className="form-control" name="id" value={product.id} readOnly />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={product.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input type="text" className="form-control" name="brand" value={product.brand} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" className="form-control" name="category" value={product.category} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" className="form-control" name="price" value={product.price} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;