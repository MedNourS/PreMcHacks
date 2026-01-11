import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';
import SignUpPage from './pages/SignUpPage';

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
    <>
      <BrowserRouter>
        {
          (isSignedIn)
            ? <Routes> // If signed in
              
            </Routes>
            : <Routes> // If not signed in
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        }
      </BrowserRouter>
    </>
  )
}

export default App
