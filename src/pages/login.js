import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  const submitHandeler = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 mb-2 mt-3">
          <div className="card">
            <div className="text-center card-header">
              <h3>Login</h3>
            </div>
            <form noValidate onSubmit={submitHandeler}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div>
                <p>
                  Create new Account! <Link to="/signUp">SignUp</Link>
                </p>
              </div>
              <div className="text-center mb-3 mt-3">
                <button
                  className="btn btn-success btn-md"
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
