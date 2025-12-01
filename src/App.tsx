import { useState, useEffect } from "react";
import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import { Auth } from './components/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user was previously logged in
    const wasLoggedIn = localStorage.getItem('ecosystem_auth');
    if (wasLoggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('ecosystem_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ecosystem_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return <RouterProvider router={router} />;
}

export default App;
