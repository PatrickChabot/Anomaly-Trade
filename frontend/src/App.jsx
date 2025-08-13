import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter import
import { useAuth } from './auth/AuthContext';
import LoginPage from './components/LoginPage';
import AuthCallBack from './auth/AuthCallBack';
import Dashboard from './components/Dashboard';

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    // Remove <Router> wrapper, just return Routes
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route path="/auth/callback" element={<AuthCallBack />} />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;