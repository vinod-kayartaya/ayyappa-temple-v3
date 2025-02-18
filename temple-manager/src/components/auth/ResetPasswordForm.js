import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/api';

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        await resetPassword(token, formData.password);
        setSuccess(true);
      } catch (error) {
        setApiError(error.message || 'Failed to reset password');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  if (!token) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card border-0'>
              <div className='card-body'>
                <div className='alert alert-danger'>
                  Invalid or missing reset token. Please request a new password reset link.
                </div>
                <button 
                  className='btn btn-primary'
                  onClick={() => navigate('/get-password-reset-link')}
                >
                  Request New Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card border-0'>
              <div className='card-body'>
                <h3 className='card-title mb-4'>Password Reset</h3>
                <div className='alert alert-success'>
                  Your password has been successfully reset.
                </div>
                <button 
                  className='btn btn-primary'
                  onClick={() => navigate('/')}
                >
                  Go to Login
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
              {apiError && (
                <div className='alert alert-danger' role='alert'>
                  {apiError}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    New Password
                  </label>
                  <div className='input-group'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                    {errors.password && (
                      <div className='invalid-feedback'>{errors.password}</div>
                    )}
                  </div>
                </div>

                <div className='mb-4'>
                  <label htmlFor='confirmPassword' className='form-label'>
                    Confirm Password
                  </label>
                  <div className='input-group'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id='confirmPassword'
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                    {errors.confirmPassword && (
                      <div className='invalid-feedback'>{errors.confirmPassword}</div>
                    )}
                  </div>
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
                        Resetting...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                  <button
                    type='button'
                    className='btn btn-link text-decoration-none'
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancel
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

export default ResetPasswordForm; 