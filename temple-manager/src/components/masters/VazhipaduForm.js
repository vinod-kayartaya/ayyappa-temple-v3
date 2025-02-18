import React, { useState, useEffect } from 'react';
import { fetchOfferingCategories } from '../../services/api';

function VazhipaduForm({ vazhipadu, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    code: '',
    vazhipaduName: '',
    amount: '',
    dailyCount: 0,
    timeAmPm: 1,
    timesPerDay: 0,
    days: 1,
    blocking: false,
    seasonal: false,
    offeringCategoryId: '',
    receipt: true,
    bookingRequired: true,
    accountHeadId: '',
    accountSubHeadId: ''
  });
  const [errors, setErrors] = useState({});
  const [offeringCategories, setOfferingCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const offeringCategoriesData = await fetchOfferingCategories();
        setOfferingCategories(offeringCategoriesData);
      } catch (err) {
        console.error('Failed to load offering categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDropdownData();
  }, []);

  useEffect(() => {
    if (vazhipadu) {
      setFormData({
        code: vazhipadu.code,
        vazhipaduName: vazhipadu.vazhipaduName,
        amount: vazhipadu.amount,
        dailyCount: vazhipadu.dailyCount,
        timeAmPm: vazhipadu.timeAmPm,
        timesPerDay: vazhipadu.timesPerDay,
        days: vazhipadu.days,
        blocking: vazhipadu.blocking,
        seasonal: vazhipadu.seasonal,
        offeringCategoryId: vazhipadu.offeringCategoryId,
        receipt: vazhipadu.receipt,
        bookingRequired: vazhipadu.bookingRequired,
        accountHeadId: vazhipadu.accountHeadId || '',
        accountSubHeadId: vazhipadu.accountSubHeadId || ''
      });
    }
  }, [vazhipadu]);

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Code is required';
    }
    if (!formData.vazhipaduName.trim()) {
      newErrors.vazhipaduName = 'Name is required';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    }
    if (!formData.offeringCategoryId) {
      newErrors.offeringCategoryId = 'Offering Category is required';
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
        <h5 className='mb-0'>{vazhipadu ? 'Edit Vazhipadu' : 'New Vazhipadu'}</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          {vazhipadu && (
            <div className='mb-3'>
              <label className='form-label'>ID</label>
              <input
                type='text'
                className='form-control'
                value={vazhipadu.id}
                readOnly
                disabled
              />
            </div>
          )}

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='code' className='form-label'>Code</label>
              <input
                type='number'
                className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                id='code'
                name='code'
                value={formData.code}
                onChange={handleChange}
              />
              {errors.code && <div className='invalid-feedback'>{errors.code}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='amount' className='form-label'>Amount</label>
              <input
                type='number'
                step='0.01'
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                id='amount'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
              />
              {errors.amount && <div className='invalid-feedback'>{errors.amount}</div>}
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='vazhipaduName' className='form-label'>Vazhipadu Name</label>
            <input
              type='text'
              className={`form-control ${errors.vazhipaduName ? 'is-invalid' : ''}`}
              id='vazhipaduName'
              name='vazhipaduName'
              value={formData.vazhipaduName}
              onChange={handleChange}
            />
            {errors.vazhipaduName && <div className='invalid-feedback'>{errors.vazhipaduName}</div>}
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='offeringCategoryId' className='form-label'>Offering Category</label>
              <select
                className={`form-select ${errors.offeringCategoryId ? 'is-invalid' : ''}`}
                id='offeringCategoryId'
                name='offeringCategoryId'
                value={formData.offeringCategoryId}
                onChange={handleChange}
              >
                <option value=''>Select Offering Category</option>
                {offeringCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.offeringCategoryId && <div className='invalid-feedback'>{errors.offeringCategoryId}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='dailyCount' className='form-label'>Daily Count</label>
              <input
                type='number'
                className='form-control'
                id='dailyCount'
                name='dailyCount'
                value={formData.dailyCount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-4'>
              <label htmlFor='timeAmPm' className='form-label'>Time</label>
              <select
                className='form-select'
                id='timeAmPm'
                name='timeAmPm'
                value={formData.timeAmPm}
                onChange={handleChange}
              >
                <option value={1}>AM</option>
                <option value={2}>PM</option>
              </select>
            </div>
            <div className='col-md-4'>
              <label htmlFor='timesPerDay' className='form-label'>Times Per Day</label>
              <input
                type='number'
                className='form-control'
                id='timesPerDay'
                name='timesPerDay'
                value={formData.timesPerDay}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-4'>
              <label htmlFor='days' className='form-label'>Days</label>
              <input
                type='number'
                className='form-control'
                id='days'
                name='days'
                value={formData.days}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-3'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='blocking'
                  name='blocking'
                  checked={formData.blocking}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='blocking'>Blocking</label>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='seasonal'
                  name='seasonal'
                  checked={formData.seasonal}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='seasonal'>Seasonal</label>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='receipt'
                  name='receipt'
                  checked={formData.receipt}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='receipt'>Receipt</label>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='bookingRequired'
                  name='bookingRequired'
                  checked={formData.bookingRequired}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='bookingRequired'>Booking Required</label>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <button type='button' className='btn btn-secondary' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {vazhipadu ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VazhipaduForm; 