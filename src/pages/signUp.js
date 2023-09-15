import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
// import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { signup, isloading, error } = useSignup();

  const submitHandeler = async (e) => {
    e.preventDefault();
    await signup(email, password, username);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mb-3 mt-3">
          <div className="card">
            <div className="card-header text-center">
              <h3>SingUp</h3>
            </div>

            <form noValidate onSubmit={submitHandeler}>
              <div className="col-sm-10 mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
              <div className="col-sm-10 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div className="col-sm-10  mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <div className="text-center mb-2 mt-3">
                <button
                  className="btn btn-success btn-md"
                  type="submit"
                  disabled={isloading}
                >
                  SignUp
                </button>
              </div>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
