// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const userData = {
//       username: formData.get('username'),
//       email: formData.get('email'),
//       password: formData.get('password'),
//     };
//     // Aquí deberías enviar `userData` a tu backend o servicio de autenticación
//     // Si el registro es exitoso, puedes redirigir al usuario a la página de login o a su dashboard
//     navigate('/login'); // Ejemplo de redirección al login
//   };

//   return (
//     <div className="container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Username</label>
//           <input type="text" className="form-control" name="username" required />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" className="form-control" name="email" required />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input type="password" className="form-control" name="password" required />
//         </div>
//         <button type="submit" className="btn btn-primary">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(''); // Estado para manejar errores

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const userData = {
//       username: formData.get('username'),
//       email: formData.get('email'),
//       password: formData.get('password'),
//     };

//     try {
//       // Aquí deberías enviar `userData` a tu backend o servicio de autenticación
//       // Simulación de una petición HTTP
//       // const response = await fetch('URL_DEL_BACKEND', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(userData),
//       // });
//       // if (!response.ok) throw new Error('Error en el registro');
      
//       // Si el registro es exitoso, puedes redirigir al usuario a la página de login o a su dashboard
//       navigate('/login'); // Ejemplo de redirección al login
//     } catch (error) {
//       setError(error.message); // Manejo de errores
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Register</h2>
//       {error && <div className="alert alert-danger" role="alert">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Username</label>
//           <input type="text" className="form-control" name="username" required />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" className="form-control" name="email" required />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input type="password" className="form-control" name="password" required />
//         </div>
//         <button type="submit" className="btn btn-primary">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(''); // Estado para manejar errores

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get('username'), // Cambiado de 'username' a 'name' para coincidir con el modelo de backend
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role') || 'USER',// Asumiendo un rol por defecto, ajusta según sea necesario
    };

    try {
      const response = await fetch('http://localhost:8080/users', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Error en el registro');
      
      navigate('/'); 
    } catch (error) {
      setError(error.message); // Manejo de errores
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name="username" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;