import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../../store/slices/authSlice';
import { loginUser } from '../../services/api';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setApiError(''); // Clear API error when user types
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const userData = await loginUser({
          username: formData.username,
          password: formData.password,
        });
        dispatch(setCredentials(userData));
        navigate('/dashboard');
      } catch (error) {
        setApiError(error.message);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='card border-0'>
      <div className='card-body'>
        <h3 className='card-title mb-4'>Login</h3>
        {apiError && (
          <div className='alert alert-danger' role='alert'>
            {apiError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
              Username
            </label>
            <input
              autoFocus
              type='text'
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className='invalid-feedback'>{errors.username}</div>
            )}
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <div className='input-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
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
                <i
                  className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                ></i>
              </button>
              {errors.password && (
                <div className='invalid-feedback'>{errors.password}</div>
              )}
            </div>
          </div>

          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='rememberMe'
              name='rememberMe'
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className='form-check-label' htmlFor='rememberMe'>
              Remember me
            </label>
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
            <Link 
              to='/get-password-reset-link'
              className='btn btn-link text-decoration-none'
            >
              Reset password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
