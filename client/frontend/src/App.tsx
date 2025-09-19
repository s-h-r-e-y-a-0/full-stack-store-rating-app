import React from "react";
import { useAuth } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { role, setRole } = useAuth();

  if (!role) {
    return (
      <Router>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div>
      <h1>Store Rating App</h1>
      {role === "admin" && (
        <div>Admin Dashboard (add stores, users, view stats...)</div>
      )}
      {role === "user" && (
        <div>User Dashboard (view stores, rate stores...)</div>
      )}
      {role === "owner" && (
        <div>Store Owner Dashboard (see ratings for your store...)</div>
      )}
      <button onClick={() => setRole(null)}>Logout</button>
    </div>
  );
}

export default App;
