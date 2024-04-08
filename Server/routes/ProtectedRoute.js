import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <Spinner animation="border" />; // componente de carga
    }
  
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" replace />;
  };
  
export default ProtectedRoute;