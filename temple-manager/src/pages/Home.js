import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../components/auth/Login';

function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='container mt-5'>
      <div className='row align-items-center'>
        <div className='col-md-7 text-start mb-4 mb-md-0'>
          <img 
            src="/lord-ayyappa.png" 
            alt="Lord Ayyappa" 
            className='img-fluid' 
            style={{ 
              maxHeight: '400px',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
            }} 
          />
        </div>
        <div className='col-md-5'>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Home;
