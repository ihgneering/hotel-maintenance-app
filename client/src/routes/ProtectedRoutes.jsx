import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {

  const { user } = useAuth();

  // not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;