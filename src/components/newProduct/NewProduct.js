// CÓDIGO UTILIZADO HASTA ANTES DE RECUPERAR LOS DATOS DE ENVÍO
// import React from 'react';
// import { Link } from 'react-router-dom';

// const NewProduct = (props) => {

//    const sendData = (e) => {
//      e.preventDefault();
//      console.log("Form sent")
     
//   }


//   return (
//     <div className="card">
//         <div className="card-header">
//             PRODUCT
//         </div>
//         <div className="card-body">
//            <form onSubmit={sendData}>
//             <div className="form-group">
//               <label htmlFor="">Code</label>
//               <input type="text" name="Code" id="Code" className="form-control" placeholder="" aria-describedby="helpId"/>
//               <small id="helpId" className="text-muted">Insert code</small>
//             </div>

//             <div className="form-group">
//               <label htmlFor="">Name</label>
//               <input type="text" name="Name" id="Name" className="form-control" placeholder="" aria-describedby="helpId"/>
//               <small id="helpId" className="text-muted">Insert name</small>
//             </div>

//             <div className="form-group">
//               <label htmlFor="">Brand</label>
//               <input type="text" name="Brand" id="Brand" className="form-control" placeholder="" aria-describedby="helpId"/>
//               <small id="helpId" className="text-muted">Insert Brand</small>
//             </div>

//             <div className="form-group">
//               <label htmlFor="">Price</label>
//               <input type="text" name="Price" id="Price" className="form-control" placeholder="" aria-describedby="helpId"/>
//               <small id="helpId" className="text-muted">Insert Price</small>
//             </div>

//             <div className="btn-group" role="group" aria-label="">
//               <button type="submit" className="btn btn-success">Add New Product</button>
//               <Link to={"/"} className="btn btn-primary">Cancel</Link>
             
//             </div>
//            </form>
//         </div>
//         <div className="card-footer text-muted">
//             Footer
//         </div>
//     </div>
//   );
// };

// export default NewProduct;


//CÓDIGO QUE INCLUTE LA RECUPERACIÓN DE DATOS DE ENVÍO

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const NewProduct = (props) => {
//   const [formData, setFormData] = useState({
//     Code: '',
//     Name: '',
//     Brand: '',
//     Price: '',
//   });

//   const sendData = (e) => {
//     e.preventDefault();

//     // Acceder a los datos del formulario
//     const { Code, Name, Brand, Price } = formData;

//     // Puedes hacer lo que desees con los datos aquí, por ejemplo, mostrarlos en la consola
//     console.log('Data sent:');
//     console.log('Code:', Code);
//     console.log('Name:', Name);
//     console.log('Brand:', Brand);
//     console.log('Price:', Price);

//     // Si deseas hacer algo más con los datos, como enviarlos al servidor, aquí es donde debes implementar esa lógica.

//     // Puedes redirigir al usuario a otra página después de enviar los datos.
//     // Por ejemplo, redirigir a la página de lista de productos.
//    // props.history.push('/products');
//   };

//   const handleInputChange = (e) => {
//     // Actualizar el estado a medida que se ingresan datos en el formulario
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="card">
//       <div className="card-header">PRODUCT</div>
//       <div className="card-body">
//         <form onSubmit={sendData}>
//           <div className="form-group">
//             <label htmlFor="Code">Code</label>
//             <input
//               type="text"
//               name="Code"
//               id="Code"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Code}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert code
//             </small>
//           </div>

//           <div className="form-group">
//             <label htmlFor="Name">Name</label>
//             <input
//               type="text"
//               name="Name"
//               id="Name"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Name}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert name
//             </small>
//           </div>

//           <div className="form-group">
//             <label htmlFor="Brand">Brand</label>
//             <input
//               type="text"
//               name="Brand"
//               id="Brand"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Brand}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert Brand
//             </small>
//           </div>

//           <div className="form-group">
//             <label htmlFor="Price">Price</label>
//             <input
//               type="text"
//               name="Price"
//               id="Price"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Price}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert Price
//             </small>
//           </div>

//           <div className="btn-group" role="group" aria-label="">
//             <button type="submit" className="btn btn-success">
//               Add New Product
//             </button>
//             <Link to={"/"} className="btn btn-primary">
//               Cancel
//             </Link>
//           </div>
//         </form>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default NewProduct;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const NewProduct = () => {
//   const [formData, setFormData] = useState({ Code: '', Name: '', Brand: '', Price: '' });
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch('http://localhost:8080/products', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         code: formData.Code,
//         name: formData.Name,
//         brand: formData.Brand,
//         price: formData.Price,
//       }),
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//       .then(() => {
//         navigate('/products');
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="card">
//       <div className="card-header">New Product</div>
//       <div className="card-body">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="Code">Code</label>
//             <input
//               type="text"
//               name="Code"
//               id="Code"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Code}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert code
//             </small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="Name">Name</label>
//             <input
//               type="text"
//               name="Name"
//               id="Name"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Name}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert name
//             </small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="Brand">Brand</label>
//             <input
//               type="text"
//               name="Brand"
//               id="Brand"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Brand}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert Brand
//             </small>
//           </div>

//           <div className="form-group">
//             <label htmlFor="Price">Price</label>
//             <input
//               type="text"
//               name="Price"
//               id="Price"
//               className="form-control"
//               placeholder=""
//               aria-describedby="helpId"
//               value={formData.Price}
//               onChange={handleInputChange}
//             />
//             <small id="helpId" className="text-muted">
//               Insert Price
//             </small>
//           </div>
         
//           <div className="btn-group" role="group" aria-label="">
//             <button type="submit" className="btn btn-success">
//               Add New Product
//             </button>
//             <Link to={"/"} className="btn btn-primary">
//               Cancel
//             </Link>
//           </div>
//         </form>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default NewProduct;

//cambié code por id y agregué category
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch('http://localhost:8080/products', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       id: formData.Id,
  //       name: formData.Name,
  //       brand: formData.Brand,
  //       category: formData.Category,
  //       price: formData.Price,
  //     }),
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //     .then(() => {
  //       navigate('/products');
  //     })
  //     .catch(error => console.error(error));
  // };
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
      navigate('/');
    })
    .catch(error => console.error(error));
  };


  return (
    <div className="card">
      <div className="card-header">New Product</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="Id">Id</label>
            <input
              type="text"
              name="Id"
              id="Id"
              className="form-control"
              placeholder=""
              aria-describedby="helpId"
              value={formData.Id}
              onChange={handleInputChange}
            />
            <small id="helpId" className="text-muted">
              Insert Id
            </small>
          </div> */}
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