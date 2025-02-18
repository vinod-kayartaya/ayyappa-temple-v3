import React from 'react';

function VazhipaduDetails({ vazhipadu, onEdit, onDelete }) {
  if (!vazhipadu) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select a vazhipadu to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Vazhipadu Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(vazhipadu)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this vazhipadu?')) {
                onDelete(vazhipadu.id);
              }
            }}
          >
            <i className='bi bi-trash me-1'></i>Delete
          </button>
        </div>
      </div>
      <div className='card-body'>
        <div className='mb-3'>
          <label className='text-muted'>ID</label>
          <p className='mb-0'>{vazhipadu.id}</p>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Code</label>
            <p className='mb-0'>{vazhipadu.code}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Amount</label>
            <p className='mb-0'>₹{vazhipadu.amount}</p>
          </div>
        </div>

        <div className='mb-3'>
          <label className='text-muted'>Vazhipadu Name</label>
          <p className='mb-0'>{vazhipadu.vazhipaduName}</p>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Offering Category</label>
            <p className='mb-0'>{vazhipadu.offeringCategoryName}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Daily Count</label>
            <p className='mb-0'>{vazhipadu.dailyCount}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-4'>
            <label className='text-muted'>Time AM/PM</label>
            <p className='mb-0'>{vazhipadu.timeAmPm === 1 ? 'AM' : 'PM'}</p>
          </div>
          <div className='col-md-4'>
            <label className='text-muted'>Times Per Day</label>
            <p className='mb-0'>{vazhipadu.timesPerDay}</p>
          </div>
          <div className='col-md-4'>
            <label className='text-muted'>Days</label>
            <p className='mb-0'>{vazhipadu.days}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-3'>
            <label className='text-muted'>Blocking</label>
            <p className='mb-0'>{vazhipadu.blocking ? 'Yes' : 'No'}</p>
          </div>
          <div className='col-md-3'>
            <label className='text-muted'>Seasonal</label>
            <p className='mb-0'>{vazhipadu.seasonal ? 'Yes' : 'No'}</p>
          </div>
          <div className='col-md-3'>
            <label className='text-muted'>Receipt</label>
            <p className='mb-0'>{vazhipadu.receipt ? 'Yes' : 'No'}</p>
          </div>
          <div className='col-md-3'>
            <label className='text-muted'>Booking Required</label>
            <p className='mb-0'>{vazhipadu.bookingRequired ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Account Head</label>
            <p className='mb-0'>{vazhipadu.accountHeadName || 'N/A'}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Account Sub Head</label>
            <p className='mb-0'>{vazhipadu.accountSubHeadName || 'N/A'}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-3'>
            <label className='text-muted'>Created By</label>
            <p className='mb-0'>{vazhipadu.createdBy}</p>
          </div>
          <div className='col-md-3'>
            <label className='text-muted'>Created At</label>
            <p className='mb-0'>{new Date(vazhipadu.createdAt).toLocaleString()}</p>
          </div>
          {vazhipadu.lastUpdatedBy && (
            <div className='col-md-3'>
              <label className='text-muted'>Last Updated By</label>
              <p className='mb-0'>{vazhipadu.lastUpdatedBy}</p>
            </div>
          )}
          {vazhipadu.lastUpdatedAt && (
            <div className='col-md-3'>
              <label className='text-muted'>Last Updated At</label>
              <p className='mb-0'>{new Date(vazhipadu.lastUpdatedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VazhipaduDetails; 