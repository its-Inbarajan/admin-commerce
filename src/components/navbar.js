import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useAdminContext } from "../hooks/useAdminContext";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // const { admin } = useAdminContext();

  const handelLogout = () => {
    logout();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark-subtle">
        <div className="container-fluid">
          <div className="p-3">
            <Link to="/" className="nav-item">
              <h1>Logo</h1>
            </Link>
          </div>
          <div className="row">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user && (
                <>
                  <li className="nav-item p-3">
                    <Link to="/login" className="nav-item">
                      <button
                        className="btn btn-sm bt-outline-danger"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Login"
                      >
                        <i className="bi bi-door-open-fill"></i>
                      </button>
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item mt-3">
                <Link to="/bookings" className="nav-item">
                  <i className="bi bi-bag"></i>
                </Link>
              </li>
              {/* <>
                <li className="nav-item p-3">
                  
                  <Link to="/Admin" className="nav-item">
                    <button
                      className="btn btn-sm bt-outline-danger"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Admin"
                    >
                      <i className="bi bi-person"></i>
                    </button>
                  </Link>
                  
                </li>
              </> */}

              <li className="nav-item mt-3">
                {user && (
                  <>
                    <span className="p-3">
                      <b>{user.email}</b>
                    </span>
                    <button
                      className="btn btn-md btn-outline-danger  "
                      onClick={handelLogout}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Logout"
                    >
                      <i className="bi bi-door-closed"></i>
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
