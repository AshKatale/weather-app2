interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
