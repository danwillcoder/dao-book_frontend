import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { isJwtExpired } from "../utils";

function ProtectedPages() {
  const { auth, token } = useAuth();

  if (isJwtExpired(token)) {
    return <Navigate to="/login" />;
  }

  return auth?._id ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedPages;
