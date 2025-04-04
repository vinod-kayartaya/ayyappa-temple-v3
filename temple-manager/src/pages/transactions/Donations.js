import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DonationForm from '../../components/donations/DonationForm';
import DateRangePicker from '../../components/common/DateRangePicker';
import Pagination from '../../components/common/Pagination';
import { 
  fetchDonations, 
  createDonation, 
  updateDonation, 
  deleteDonation,
  fetchDonationCategories 
} from '../../services/api';

function Donations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationCategories, setDonationCategories] = useState([]);
  
  // Initialize state from URL parameters
  const [dateRange, setDateRange] = useState({
    startDate: new Date(searchParams.get('startDate') || new Date().setDate(1)),
    endDate: new Date(searchParams.get('endDate') || new Date())
  });
  
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get('page')) || 0,
    size: parseInt(searchParams.get('size')) || 10,
    totalElements: 0,
    totalPages: 0
  });

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredDonations, setFilteredDonations] = useState(null);

  // Update URL when state changes
  const updateUrlParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  useEffect(() => {
    loadDonationCategories();
  }, []); // Run only once on mount

  useEffect(() => {
    loadDonations();
  }, [dateRange, pagination.page, pagination.size]); // Dependencies for loadDonations

  useEffect(() => {
    // Update URL when search term changes
    updateUrlParams({ search: searchTerm || null });
    
    if (searchTerm) {
      const filtered = donations.filter(donation => 
        donation.devoteeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.devoteePhone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.devoteeEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDonations(filtered);
    } else {
      setFilteredDonations(null);
    }
  }, [searchTerm, donations]);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const response = await fetchDonations({
        page: pagination.page,
        size: pagination.size,
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0]
      });
      setDonations(response.content);
      setPagination(prev => ({
        ...prev,
        totalElements: response.totalElements,
        totalPages: response.totalPages
      }));
      setError(null);

      // Update URL with date range and pagination
      updateUrlParams({
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
        page: pagination.page.toString(),
        size: pagination.size.toString()
      });
    } catch (err) {
      setError('Failed to load donations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDonationCategories = async () => {
    try {
      const categories = await fetchDonationCategories();
      setDonationCategories(categories);
    } catch (err) {
      console.error('Failed to load donation categories:', err);
    }
  };

  const handleEdit = (donation) => {
    setSelectedDonation(donation);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedDonation(null);
  };

  const handleSubmit = async (formData) => {
    try {
      const updatedDonation = await updateDonation(selectedDonation.id, formData);
      setDonations(donations.map(don => 
        don.id === selectedDonation.id ? updatedDonation : don
      ));
      setIsEditing(false);
      setSelectedDonation(null);
      setError(null);
      loadDonations(); // Refresh the list
    } catch (err) {
      setError('Failed to update donation');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDonation(id);
      setDonations(donations.filter(don => don.id !== id));
      setSelectedDonation(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete donation');
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    updateUrlParams({ page: newPage.toString() });
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    setPagination(prev => ({ ...prev, page: 0 }));
    updateUrlParams({
      startDate: newRange.startDate.toISOString().split('T')[0],
      endDate: newRange.endDate.toISOString().split('T')[0],
      page: '0'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && donations.length === 0) {
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
    <div className='container mt-4'>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      
      <div className='mb-4'>
        <div className='d-flex justify-content-between align-items-end'>
          <h5 className='mb-0'>Donations</h5>
          <div className='d-flex gap-3 align-items-end'>
            <div>
              <label className='form-label small mb-1'>Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, receipt, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onChange={handleDateRangeChange}
            />
          </div>
        </div>
      </div>

      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Receipt #</th>
              <th>Date</th>
              <th>Devotee Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredDonations || donations).map(donation => (
              <tr key={donation.id}>
                <td>{donation.receiptNumber}</td>
                <td>{formatDate(donation.donationDate)}</td>
                <td>{donation.devoteeName}</td>
                <td>{donation.donationCategory?.name}</td>
                <td>{formatCurrency(donation.amount)}</td>
                <td>{donation.paymentMode}</td>
                <td>
                  <button 
                    className='btn btn-link btn-sm p-0 me-2'
                    onClick={() => handleEdit(donation)}
                  >
                    <i className='bi bi-pencil'></i>
                  </button>
                  <button 
                    className='btn btn-link btn-sm p-0 text-danger'
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this donation?')) {
                        handleDelete(donation.id);
                      }
                    }}
                  >
                    <i className='bi bi-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {donations.length > 0 && (
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <div className='text-muted'>
            Showing {pagination.page * pagination.size + 1} to {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of {pagination.totalElements} entries
          </div>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <>
          {/* Semi-transparent overlay for the left side */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: '50%',
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1040
          }} onClick={handleCancel} />

          {/* Edit panel on the right */}
          <div style={{ 
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundColor: '#fff',
            zIndex: 1050,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 10px rgba(0,0,0,0.1)'
          }}>
            <div className='d-flex align-items-center p-3 border-bottom' style={{ backgroundColor: '#f8f9fa' }}>
              <h5 className='modal-title flex-grow-1 mb-0'>Edit Donation</h5>
              <button 
                type='button' 
                className='btn-close' 
                onClick={handleCancel}
                aria-label="Close"
              />
            </div>
            <div className='flex-grow-1 p-4' style={{ overflowY: 'auto' }}>
              <DonationForm
                donation={selectedDonation}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                donationCategories={donationCategories}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Donations; 