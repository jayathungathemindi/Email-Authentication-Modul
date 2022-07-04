import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const location = useLocation();
  const name = localStorage.getItem("name");
  const accountType = localStorage.getItem("accountType");
  return accountType === allowedRole ? (
    <Outlet />
  ) : name ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/SignIn" state={{ from: location }} replace />
  );
};

export default RequireAuth;
