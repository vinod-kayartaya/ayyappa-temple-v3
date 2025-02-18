import React, { useState, useEffect } from 'react';

function DeityForm({ deity, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (deity) {
      setFormData({
        name: deity.name
      });
    }
  }, [deity]);

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
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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
        <h5 className='mb-0'>{deity ? 'Edit Deity' : 'New Deity'}</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          {deity && (
            <div className='mb-3'>
              <label className='form-label'>ID</label>
              <input
                type='text'
                className='form-control'
                value={deity.id}
                readOnly
                disabled
              />
            </div>
          )}

          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input
              type='text'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <button type='button' className='btn btn-secondary' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {deity ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeityForm; 