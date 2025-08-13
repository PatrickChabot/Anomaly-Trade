import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  
  const login = (token, userData) => {
    setJwtToken(token);
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('jwt', token);
  };
  
  const logout = () => {
    setJwtToken(null);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('jwt');
  };
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setJwtToken(token);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else if (!isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const getAuthHeader = () => {
    return jwtToken ? { 'Authorization': `Bearer ${jwtToken}` } : {};
  };
  
  return (
    <AuthContext.Provider value={{
      jwtToken,
      isAuthenticated,
      user,
      isLoading,
      login,
      logout,
      getAuthHeader
    }}>
      {children}
    </AuthContext.Provider>
  );
};