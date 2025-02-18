import React, { useState, useEffect } from 'react';

function CategoryForm({ category, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        code: category.code,
        name: category.name,
        description: category.description || ''
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Code is required';
    }
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
        <h5 className='mb-0'>{category ? 'Edit Category' : 'New Category'}</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          {category && (
            <div className='mb-3'>
              <label className='form-label'>ID</label>
              <input
                type='text'
                className='form-control'
                value={category.id}
                readOnly
                disabled
              />
            </div>
          )}

          <div className='mb-3'>
            <label htmlFor='code' className='form-label'>Code</label>
            <input
              type='text'
              className={`form-control ${errors.code ? 'is-invalid' : ''}`}
              id='code'
              name='code'
              value={formData.code}
              onChange={handleChange}
            />
            {errors.code && <div className='invalid-feedback'>{errors.code}</div>}
          </div>

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

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>Description</label>
            <textarea
              className='form-control'
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows='3'
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <button type='button' className='btn btn-secondary' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {category ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm; 