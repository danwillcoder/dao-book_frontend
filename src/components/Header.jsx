import { useLocation, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import TitleLockup from "../atoms/TitleLockup";
import useAuth from "../hooks/useAuth";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  //TODO: Fix logout button when login added
  const isLoggedIn = true;
  const dashboardRoute = "/";

  // Only show dashboard button when not on dashboard
  const isNotOnDashboard = location.pathname !== dashboardRoute;

  // No header on these pages
  if (location.pathname === "/register" || location.pathname === "/login") {
    return <></>;
  }

  return (
    <header className="flex place-content-between items-center bg-daobook-amber p-6">
      <TitleLockup
        theme="light"
        isSubtitled={false}
        isSmall={true}
      ></TitleLockup>
      <div className="inline-flex gap-7">
        {isNotOnDashboard && (
          <Button
            theme="inverted"
            buttonText="Dashboard"
            onClick={() => {
              navigate(dashboardRoute);
            }}
          ></Button>
        )}
        {isLoggedIn ? (
          <Button
            theme="light"
            buttonText="Logout"
            onClick={() => {
              //TODO logout here
              localStorage.removeItem("auth");
              setAuth({});
            }}
          ></Button>
        ) : (
          <Button
            theme="light"
            buttonText="Patient Login"
            onClick={() => {
              //TODO nav to patient dash
              console.log("Nav to patient dash");
            }}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
