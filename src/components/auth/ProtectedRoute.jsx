import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No auth token")
    return <Navigate to="/login" replace />;
  }

  try {
    // 1. Decode without verifying signature (safe for frontend)
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // 2. Check if the token has expired
    if (decoded.exp < currentTime) {
      console.warn("Token expired");
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // 3. Token looks valid and active
    return children;
  } catch (error) {
    // If the token is malformed/fake, jwtDecode will throw an error
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};