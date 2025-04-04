import React, { useState, useEffect } from 'react';
import Pagination from '../common/Pagination';

function DonationList({ donations, onSelect, selectedId, pagination, onPageChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDonations, setFilteredDonations] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDonations(donations);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = donations.filter(donation => {
      return (
        (donation.devoteeName && donation.devoteeName.toLowerCase().includes(searchLower)) ||
        (donation.devoteePhone && donation.devoteePhone.toLowerCase().includes(searchLower)) ||
        (donation.devoteeEmail && donation.devoteeEmail.toLowerCase().includes(searchLower)) ||
        (donation.receiptNumber && donation.receiptNumber.toLowerCase().includes(searchLower)) ||
        (donation.donationCategory && donation.donationCategory.name.toLowerCase().includes(searchLower))
      );
    });
    
    setFilteredDonations(filtered);
  }, [searchTerm, donations]);

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

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='mb-4'>
          <h5 className='card-title mb-0'>Donations List</h5>
        </div>

        {/* Search Filter */}
        <div className='mb-3'>
          <input
            type='search'
            className='form-control'
            placeholder='Search by name, phone, email, receipt number...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='list-group'>
          {filteredDonations.length === 0 ? (
            <div className='list-group-item text-center text-muted'>
              {searchTerm ? 'No matching donations found' : 'No donations found'}
            </div>
          ) : (
            filteredDonations.map((donation) => (
              <button
                key={donation.id}
                className={`list-group-item list-group-item-action ${
                  selectedId === donation.id ? 'active' : ''
                }`}
                onClick={() => onSelect(donation)}
              >
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <div className='fw-bold'>{donation.devoteeName}</div>
                    <small className={selectedId === donation.id ? 'text-light' : 'text-muted'}>
                      Receipt: {donation.receiptNumber}
                    </small>
                    <br />
                    <small className={selectedId === donation.id ? 'text-light' : 'text-muted'}>
                      Phone: {donation.devoteePhone || 'N/A'}
                    </small>
                    <br />
                    <small className={selectedId === donation.id ? 'text-light' : 'text-muted'}>
                      Category: {donation.donationCategory?.name || 'N/A'}
                    </small>
                    <br />
                    <small className={selectedId === donation.id ? 'text-light' : 'text-muted'}>
                      Date: {formatDate(donation.donationDate)}
                    </small>
                  </div>
                  <div className='text-end'>
                    <div className='fw-bold'>{formatCurrency(donation.amount)}</div>
                    <small className={selectedId === donation.id ? 'text-light' : 'text-muted'}>
                      {donation.paymentMode}
                    </small>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {filteredDonations.length > 0 && pagination && (
          <div className='mt-3'>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DonationList; 