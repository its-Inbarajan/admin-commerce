import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// pages and components
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Bookings from "./pages/bookings";
// hooks
import { useAuthContext } from "./hooks/useAuthContext";
// import { ShowUserProducts } from "./pages/userProds";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signUp"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route path="/bookings" element={<Bookings />} />

            {/* <Route path="/userProds" element={<ShowUserProducts />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
