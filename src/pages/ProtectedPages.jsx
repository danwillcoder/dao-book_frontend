import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedPages() {
  const { auth } = useAuth();
  console.log("Auth state:", auth);
  return <Outlet />;
}

export default ProtectedPages;
