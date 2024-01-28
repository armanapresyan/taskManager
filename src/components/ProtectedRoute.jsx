import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, reverse }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  if (loading) {
    return null;
  }

	if (reverse) {
		return isAuthenticated ? <Navigate to="/tasks" /> : element;
	}

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute
