import React, { useState, useEffect } from 'react';
import DonationForm from '../../components/donations/DonationForm';
import { fetchDonationCategories, createDonation } from '../../services/api';

function BillingDonations() {
  const [donationCategories, setDonationCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDonationCategories();
  }, []);

  const loadDonationCategories = async () => {
    try {
      setLoading(true);
      const categories = await fetchDonationCategories();
      setDonationCategories(categories);
      setError(null);
    } catch (err) {
      setError('Failed to load donation categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await createDonation(formData);
      setSuccess(true);
      setError(null);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
      // Reset form by forcing a re-render
      loadDonationCategories();
    } catch (err) {
      setError('Failed to create donation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Just reset the form by forcing a re-render
    loadDonationCategories();
  };

  if (loading && donationCategories.length === 0) {
    return (
      <div className='container mt-4'>
        <div className='text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='card mt-4'>
        <div className='card-body'>
          <h5 className='card-title mb-4'>Record Donation</h5>
          
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}
          
          {success && (
            <div className='alert alert-success' role='alert'>
              Donation recorded successfully! Receipt has been generated.
            </div>
          )}
          
          <DonationForm
            donation={null}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            donationCategories={donationCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default BillingDonations; 