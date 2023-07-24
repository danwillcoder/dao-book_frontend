import { useLocation, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import TitleLockup from "../atoms/TitleLockup";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  //TODO: Fix logout button when login added
  const isLoggedIn = true;
  const dashboardRoute = "/dashboard";

  const isNotOnDashboard = location.pathname !== dashboardRoute;

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
        {isLoggedIn && (
          <Button
            theme="light"
            buttonText="Logout"
            onClick={() => {
              // logout here
              console.log("Logged out");
            }}
          ></Button>
        )}
      </div>
    </header>
  );
}

export default Header;
