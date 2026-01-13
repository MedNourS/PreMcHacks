import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Dashboard from '';
import Home from ''
import './index.css'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    async function getUser() {
      const res = await fetch('http://localhost:3000/user/profile', {
        credentials: 'include',
      });

      if (!res.ok) {
        return false;
      }

      const user = await res.json();
      return user;
    }

    getUser().then(user => {
      setIsSignedIn(!!user);
    });
  }, []);

  return (
      <Router>
          {(isSignedIn)
            ? <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            : <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          }
      </Router>
  )
}

export default App
