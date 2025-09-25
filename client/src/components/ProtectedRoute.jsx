import { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('ProtectedRoute checking token:', token ? 'Token present' : 'No token');
    // Wait briefly for AuthContext to fetch user
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('ProtectedRoute loading complete, user:', user);
    }, 1000); // Adjust timeout if needed
    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
