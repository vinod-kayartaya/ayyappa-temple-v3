import React from 'react';

function DonationDetails({ donation, onEdit, onDelete }) {
  if (!donation) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select a donation to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Donation Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(donation)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this donation?')) {
                onDelete(donation.id);
              }
            }}
          >
            <i className='bi bi-trash me-1'></i>Delete
          </button>
        </div>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='text-muted'>Receipt Number</label>
              <p className='mb-0'>{donation.receiptNumber}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Donation Category</label>
              <p className='mb-0'>{donation.donationCategory?.name}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Donation Date</label>
              <p className='mb-0'>{new Date(donation.donationDate).toLocaleDateString()}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Amount</label>
              <p className='mb-0'>₹{donation.amount.toFixed(2)}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Payment Mode</label>
              <p className='mb-0'>{donation.paymentMode}</p>
            </div>
            {donation.paymentReference && (
              <div className='mb-3'>
                <label className='text-muted'>Payment Reference</label>
                <p className='mb-0'>{donation.paymentReference}</p>
              </div>
            )}
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='text-muted'>Devotee Name</label>
              <p className='mb-0'>{donation.devoteeName}</p>
            </div>
            {donation.devoteePhone && (
              <div className='mb-3'>
                <label className='text-muted'>Phone Number</label>
                <p className='mb-0'>{donation.devoteePhone}</p>
              </div>
            )}
            {donation.devoteeEmail && (
              <div className='mb-3'>
                <label className='text-muted'>Email</label>
                <p className='mb-0'>{donation.devoteeEmail}</p>
              </div>
            )}
            {donation.devoteeAddress && (
              <div className='mb-3'>
                <label className='text-muted'>Address</label>
                <p className='mb-0'>{donation.devoteeAddress}</p>
              </div>
            )}
            {donation.remarks && (
              <div className='mb-3'>
                <label className='text-muted'>Remarks</label>
                <p className='mb-0'>{donation.remarks}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationDetails; 