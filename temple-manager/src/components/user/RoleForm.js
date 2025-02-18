import React, { useState, useEffect } from 'react';

function RoleForm({ role, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    role: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (role) {
      setFormData({
        role: role.role
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
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

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='mb-0'>{role ? 'Edit Role' : 'New Role'}</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          {role && (
            <div className='mb-3'>
              <label className='form-label'>ID</label>
              <input
                type='text'
                className='form-control'
                value={role.id}
                readOnly
                disabled
              />
            </div>
          )}

          <div className='mb-3'>
            <label htmlFor='role' className='form-label'>Role</label>
            <input
              type='text'
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
              id='role'
              name='role'
              value={formData.role}
              onChange={handleChange}
            />
            {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <button type='button' className='btn btn-secondary' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {role ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleForm; 