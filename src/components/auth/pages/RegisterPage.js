import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(''); // Estado para manejar errores

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role') || 'USER', // Manteniendo el campo 'role' con un valor por defecto de 'USER'
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
      
      navigate('/'); // Navega a la página de inicio después de un registro exitoso
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
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(''); // Estado para manejar errores

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const userData = {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       // Se ha eliminado el campo 'name' y 'role' para simplificar el registro
//     };

//     try {
//       const response = await fetch('http://localhost:8080/users', { 
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
//       if (!response.ok) throw new Error('Error en el registro');
      
//       navigate('/'); // Navega a la página de inicio después de un registro exitoso
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
//       name: formData.get('username'), // Cambiado de 'username' a 'name' para coincidir con el modelo de backend
//       email: formData.get('email'),
//       password: formData.get('password'),
//       role: formData.get('role') || 'USER',// Asumiendo un rol por defecto, ajusta según sea necesario
//     };

//     try {
//       const response = await fetch('http://localhost:8080/users', { 
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
//       if (!response.ok) throw new Error('Error en el registro');
      
//       navigate('/'); 
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