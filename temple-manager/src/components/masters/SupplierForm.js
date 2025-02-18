import React, { useState, useEffect } from 'react';

function SupplierForm({ supplier, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    shortForm: '',
    type: '',
    address: '',
    phone: '',
    email: '',
    reorderLevel: '',
    marginPercentage: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (supplier) {
      setFormData({
        code: supplier.code,
        name: supplier.name,
        shortForm: supplier.shortForm,
        type: supplier.type,
        address: supplier.address,
        phone: supplier.phone,
        email: supplier.email,
        reorderLevel: supplier.reorderLevel,
        marginPercentage: supplier.marginPercentage
      });
    }
  }, [supplier]);

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
    if (!formData.code) {
      newErrors.code = 'Code is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.shortForm.trim()) {
      newErrors.shortForm = 'Short Form is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
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
        <h5 className='mb-0'>{supplier ? 'Edit Supplier' : 'New Supplier'}</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          {supplier && (
            <div className='mb-3'>
              <label className='form-label'>ID</label>
              <input
                type='text'
                className='form-control'
                value={supplier.id}
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

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='shortForm' className='form-label'>Short Form</label>
              <input
                type='text'
                className={`form-control ${errors.shortForm ? 'is-invalid' : ''}`}
                id='shortForm'
                name='shortForm'
                value={formData.shortForm}
                onChange={handleChange}
              />
              {errors.shortForm && <div className='invalid-feedback'>{errors.shortForm}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='type' className='form-label'>Type</label>
              <input
                type='text'
                className='form-control'
                id='type'
                name='type'
                value={formData.type}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='address' className='form-label'>Address</label>
            <textarea
              className='form-control'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              rows='2'
            />
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='phone' className='form-label'>Phone</label>
              <input
                type='text'
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='email' className='form-label'>Email</label>
              <input
                type='email'
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='reorderLevel' className='form-label'>Reorder Level</label>
              <input
                type='number'
                className='form-control'
                id='reorderLevel'
                name='reorderLevel'
                value={formData.reorderLevel}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='marginPercentage' className='form-label'>Margin Percentage</label>
              <input
                type='number'
                step='0.01'
                className='form-control'
                id='marginPercentage'
                name='marginPercentage'
                value={formData.marginPercentage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <button type='button' className='btn btn-secondary' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {supplier ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupplierForm; 