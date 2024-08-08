import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ component: Component, ...rest }) {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Adjust authentication check as needed

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
