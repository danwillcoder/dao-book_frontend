import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { isJwtExpired } from "../utils";
import { useMediaQuery } from "react-responsive";

function ProtectedPages() {
  const { auth, token } = useAuth();

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  if (isMobile || auth?.isPatient === true) {
    return <Navigate to="/mobile" />;
  }

  if (isJwtExpired(token)) {
    return <Navigate to="/login" />;
  }

  return auth?._id ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedPages;
