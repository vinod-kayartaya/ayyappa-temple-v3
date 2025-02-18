import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../services/api';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset password email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card border-0'>
              <div className='card-body'>
                <h3 className='card-title mb-4'>Reset Password</h3>
                <div className='alert alert-success' role='alert'>
                  Password reset link has been sent to your email address. Please check your inbox and click the link to reset your password.
                </div>
                <button 
                  className='btn btn-primary' 
                  onClick={() => navigate('/')}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card border-0'>
            <div className='card-body'>
              <h3 className='card-title mb-4'>Reset Password</h3>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    disabled={loading}
                  />
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <button 
                    type='submit' 
                    className='btn btn-primary'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                  <button 
                    type='button' 
                    className='btn btn-link text-decoration-none'
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword; 