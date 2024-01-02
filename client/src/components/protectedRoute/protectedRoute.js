import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token'); 
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]); 

  return(
    <div>
      <Outlet/>
    </div>
  )
}
export default ProtectedRoute;