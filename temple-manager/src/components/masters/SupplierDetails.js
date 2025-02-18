import React from 'react';

function SupplierDetails({ supplier, onEdit, onDelete }) {
  if (!supplier) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select a supplier to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Supplier Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(supplier)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this supplier?')) {
                onDelete(supplier.id);
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
          <p className='mb-0'>{supplier.id}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Code</label>
          <p className='mb-0'>{supplier.code}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Name</label>
          <p className='mb-0'>{supplier.name}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Short Form</label>
          <p className='mb-0'>{supplier.shortForm}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Type</label>
          <p className='mb-0'>{supplier.type}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Address</label>
          <p className='mb-0'>{supplier.address}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Phone</label>
          <p className='mb-0'>{supplier.phone}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Email</label>
          <p className='mb-0'>{supplier.email}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Reorder Level</label>
          <p className='mb-0'>{supplier.reorderLevel}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Margin Percentage</label>
          <p className='mb-0'>{supplier.marginPercentage}%</p>
        </div>
      </div>
    </div>
  );
}

export default SupplierDetails; 