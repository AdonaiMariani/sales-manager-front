import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    // Simulación de envío de datos al servidor
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

       // Verifica si el tipo de contenido de la respuesta es JSON
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('El servidor no respondió con JSON');
  }
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to login');
      
      // Simulación de una respuesta exitosa
      console.log("Login successful with", { username, password });
      
      navigate("/home"); // Navega al home después del login exitoso
    } catch (error) {
      console.error("Login error:", error.message);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div className="modal" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login Page</h5>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
              />
              <input
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                name="password"
              />
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
              {/* Enlace para registrarse */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;