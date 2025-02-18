import React from 'react';

function OfferingCategoryDetails({ offeringCategory, onEdit, onDelete }) {
  if (!offeringCategory) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select an offering category to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Offering Category Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(offeringCategory)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this offering category?')) {
                onDelete(offeringCategory.id);
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
          <p className='mb-0'>{offeringCategory.id}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Name</label>
          <p className='mb-0'>{offeringCategory.name}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Created By</label>
          <p className='mb-0'>{offeringCategory.createdBy}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Created At</label>
          <p className='mb-0'>{new Date(offeringCategory.createdAt).toLocaleString()}</p>
        </div>
        {offeringCategory.lastUpdatedBy && (
          <div className='mb-3'>
            <label className='text-muted'>Last Updated By</label>
            <p className='mb-0'>{offeringCategory.lastUpdatedBy}</p>
          </div>
        )}
        {offeringCategory.lastUpdatedAt && (
          <div className='mb-3'>
            <label className='text-muted'>Last Updated At</label>
            <p className='mb-0'>{new Date(offeringCategory.lastUpdatedAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfferingCategoryDetails; 