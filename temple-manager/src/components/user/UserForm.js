import React, { useState, useEffect } from 'react';
import { fetchRoles } from '../../services/api';

function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    primaryEmail: '',
    primaryPhone: '',
    secondaryEmail: '',
    secondaryPhone: '',
    designation: '',
    isActive: true,
    passwordChangeRequired: false,
    roles: []
  });
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (err) {
        console.error('Failed to load roles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        primaryEmail: user.primaryEmail,
        primaryPhone: user.primaryPhone,
        secondaryEmail: user.secondaryEmail || '',
        secondaryPhone: user.secondaryPhone || '',
        designation: user.designation,
        isActive: user.isActive,
        passwordChangeRequired: user.passwordChangeRequired,
        roles: user.roles.map(r => r.id)
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (roleId) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(id => id !== roleId)
        : [...prev.roles, roleId]
    }));
    if (errors.roles) {
      setErrors(prev => ({ ...prev, roles: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }
    if (!formData.primaryEmail.trim()) {
      newErrors.primaryEmail = 'Primary email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.primaryEmail)) {
      newErrors.primaryEmail = 'Invalid email format';
    }
    if (!formData.primaryPhone.trim()) {
      newErrors.primaryPhone = 'Primary phone is required';
    }
    if (formData.secondaryEmail && !/\S+@\S+\.\S+/.test(formData.secondaryEmail)) {
      newErrors.secondaryEmail = 'Invalid email format';
    }
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }
    if (formData.roles.length === 0) {
      newErrors.roles = 'At least one role must be selected';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  if (loading) {
    return (
      <div className='card'>
        <div className='card-body text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='mb-0'>{user ? 'Edit User' : 'New User'}</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          {user && (
            <div className='mb-3'>
              <label className='form-label'>ID</label>
              <input
                type='text'
                className='form-control'
                value={user.id}
                readOnly
                disabled
              />
            </div>
          )}

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='username' className='form-label'>Username</label>
              <input
                type='text'
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='designation' className='form-label'>Designation</label>
              <input
                type='text'
                className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                id='designation'
                name='designation'
                value={formData.designation}
                onChange={handleChange}
              />
              {errors.designation && <div className='invalid-feedback'>{errors.designation}</div>}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='firstname' className='form-label'>First Name</label>
              <input
                type='text'
                className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                id='firstname'
                name='firstname'
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='lastname' className='form-label'>Last Name</label>
              <input
                type='text'
                className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                id='lastname'
                name='lastname'
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='primaryEmail' className='form-label'>Primary Email</label>
              <input
                type='email'
                className={`form-control ${errors.primaryEmail ? 'is-invalid' : ''}`}
                id='primaryEmail'
                name='primaryEmail'
                value={formData.primaryEmail}
                onChange={handleChange}
              />
              {errors.primaryEmail && <div className='invalid-feedback'>{errors.primaryEmail}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='primaryPhone' className='form-label'>Primary Phone</label>
              <input
                type='tel'
                className={`form-control ${errors.primaryPhone ? 'is-invalid' : ''}`}
                id='primaryPhone'
                name='primaryPhone'
                value={formData.primaryPhone}
                onChange={handleChange}
              />
              {errors.primaryPhone && <div className='invalid-feedback'>{errors.primaryPhone}</div>}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='secondaryEmail' className='form-label'>Secondary Email</label>
              <input
                type='email'
                className={`form-control ${errors.secondaryEmail ? 'is-invalid' : ''}`}
                id='secondaryEmail'
                name='secondaryEmail'
                value={formData.secondaryEmail}
                onChange={handleChange}
              />
              {errors.secondaryEmail && <div className='invalid-feedback'>{errors.secondaryEmail}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='secondaryPhone' className='form-label'>Secondary Phone</label>
              <input
                type='tel'
                className='form-control'
                id='secondaryPhone'
                name='secondaryPhone'
                value={formData.secondaryPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mb-3'>
            <label className='form-label'>Roles</label>
            <div className={`list-group ${errors.roles ? 'is-invalid' : ''}`}>
              {roles.map(role => (
                <label key={role.id} className='list-group-item'>
                  <div className='d-flex align-items-center'>
                    <input
                      type='checkbox'
                      className='form-check-input me-2'
                      checked={formData.roles.includes(role.id)}
                      onChange={() => handleRoleChange(role.id)}
                    />
                    {role.role}
                  </div>
                </label>
              ))}
            </div>
            {errors.roles && <div className='invalid-feedback'>{errors.roles}</div>}
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='isActive'
                  name='isActive'
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='isActive'>Active</label>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='passwordChangeRequired'
                  name='passwordChangeRequired'
                  checked={formData.passwordChangeRequired}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='passwordChangeRequired'>
                  Password Change Required
                </label>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <button type='button' className='btn btn-secondary' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {user ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm; 