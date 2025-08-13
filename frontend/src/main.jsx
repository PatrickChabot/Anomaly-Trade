import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>           {/* Router goes outside */}
      <AuthProvider>   {/* AuthProvider can now use useNavigate */}
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
)