import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/home");
  };
  return (
    <div className="modal" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login Page</h5>
          </div>
          <form>
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
                onClick={onSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
