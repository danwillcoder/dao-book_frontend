import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectedPages() {
  const { auth } = useAuth();

  return auth?._id ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedPages;
