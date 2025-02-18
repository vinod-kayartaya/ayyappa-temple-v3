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
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Home;
