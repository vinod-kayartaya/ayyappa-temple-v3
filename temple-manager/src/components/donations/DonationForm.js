import React, { useState, useEffect } from 'react';

function DonationForm({ donation, onSubmit, onCancel, donationCategories }) {
  const [formData, setFormData] = useState({
    donationCategoryId: '',
    devoteeName: '',
    devoteePhone: '',
    devoteeEmail: '',
    devoteeAddress: '',
    amount: '',
    paymentMode: 'CASH',
    paymentReference: '',
    donationDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });
  const [errors, setErrors] = useState({});

  // Add escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  useEffect(() => {
    if (donation) {
      setFormData({
        donationCategoryId: donation.donationCategoryId,
        devoteeName: donation.devoteeName,
        devoteePhone: donation.devoteePhone || '',
        devoteeEmail: donation.devoteeEmail || '',
        devoteeAddress: donation.devoteeAddress || '',
        amount: donation.amount,
        paymentMode: donation.paymentMode,
        paymentReference: donation.paymentReference || '',
        donationDate: donation.donationDate,
        remarks: donation.remarks || ''
      });
    }
  }, [donation]);

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
    if (!formData.donationCategoryId) {
      newErrors.donationCategoryId = 'Donation category is required';
    }
    if (!formData.devoteeName.trim()) {
      newErrors.devoteeName = 'Devotee name is required';
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.donationDate) {
      newErrors.donationDate = 'Donation date is required';
    }
    if (formData.devoteeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.devoteeEmail)) {
      newErrors.devoteeEmail = 'Invalid email format';
    }
    if (formData.devoteePhone && !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(formData.devoteePhone.replace(/\s/g, ''))) {
      newErrors.devoteePhone = 'Invalid phone number format';
    }
    if (formData.paymentMode !== 'CASH' && !formData.paymentReference) {
      newErrors.paymentReference = 'Payment reference is required for non-cash payments';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...formData,
        amount: parseFloat(formData.amount)
      });
    } else {
      setErrors(newErrors);
    }
  };

  const paymentModes = [
    { value: 'CASH', label: 'Cash' },
    { value: 'UPI', label: 'UPI' },
    { value: 'CARD', label: 'Card' },
    { value: 'CHEQUE', label: 'Cheque' },
    { value: 'BANK_TRANSFER', label: 'Bank Transfer' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="donationCategoryId" className="form-label">Donation Category</label>
            <select
              className={`form-select ${errors.donationCategoryId ? 'is-invalid' : ''}`}
              id="donationCategoryId"
              name="donationCategoryId"
              value={formData.donationCategoryId}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {donationCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.donationCategoryId && (
              <div className="invalid-feedback">{errors.donationCategoryId}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="donationDate" className="form-label">Donation Date</label>
            <input
              type="date"
              className={`form-control ${errors.donationDate ? 'is-invalid' : ''}`}
              id="donationDate"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
            />
            {errors.donationDate && (
              <div className="invalid-feedback">{errors.donationDate}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="devoteeName" className="form-label">Devotee Name</label>
            <input
              type="text"
              className={`form-control ${errors.devoteeName ? 'is-invalid' : ''}`}
              id="devoteeName"
              name="devoteeName"
              value={formData.devoteeName}
              onChange={handleChange}
            />
            {errors.devoteeName && (
              <div className="invalid-feedback">{errors.devoteeName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
            {errors.amount && (
              <div className="invalid-feedback">{errors.amount}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="devoteeAddress" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="devoteeAddress"
              name="devoteeAddress"
              value={formData.devoteeAddress}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="devoteePhone" className="form-label">Phone Number</label>
            <input
              type="text"
              className={`form-control ${errors.devoteePhone ? 'is-invalid' : ''}`}
              id="devoteePhone"
              name="devoteePhone"
              value={formData.devoteePhone}
              onChange={handleChange}
            />
            {errors.devoteePhone && (
              <div className="invalid-feedback">{errors.devoteePhone}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="devoteeEmail" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.devoteeEmail ? 'is-invalid' : ''}`}
              id="devoteeEmail"
              name="devoteeEmail"
              value={formData.devoteeEmail}
              onChange={handleChange}
            />
            {errors.devoteeEmail && (
              <div className="invalid-feedback">{errors.devoteeEmail}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="paymentMode" className="form-label">Payment Mode</label>
            <select
              className="form-select"
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
            >
              {paymentModes.map(mode => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          {formData.paymentMode !== 'CASH' && (
            <div className="mb-3">
              <label htmlFor="paymentReference" className="form-label">Payment Reference</label>
              <input
                type="text"
                className={`form-control ${errors.paymentReference ? 'is-invalid' : ''}`}
                id="paymentReference"
                name="paymentReference"
                value={formData.paymentReference}
                onChange={handleChange}
              />
              {errors.paymentReference && (
                <div className="invalid-feedback">{errors.paymentReference}</div>
              )}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="remarks" className="form-label">Remarks</label>
            <textarea
              className="form-control"
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {donation ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default DonationForm; 