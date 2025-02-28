import React from 'react';

function ExpenseCategoryDetails({ category, onEdit, onDelete }) {
  if (!category) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select an expense category to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Expense Category Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(category)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this expense category?')) {
                onDelete(category.id);
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
          <p className='mb-0'>{category.id}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Name</label>
          <p className='mb-0'>{category.name}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Description</label>
          <p className='mb-0'>{category.description || '-'}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Created By</label>
          <p className='mb-0'>{category.createdBy}</p>
        </div>
        <div className='mb-3'>
          <label className='text-muted'>Created At</label>
          <p className='mb-0'>{new Date(category.createdAt).toLocaleString()}</p>
        </div>
        {category.lastUpdatedBy && (
          <div className='mb-3'>
            <label className='text-muted'>Last Updated By</label>
            <p className='mb-0'>{category.lastUpdatedBy}</p>
          </div>
        )}
        {category.lastUpdatedAt && (
          <div className='mb-3'>
            <label className='text-muted'>Last Updated At</label>
            <p className='mb-0'>{new Date(category.lastUpdatedAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseCategoryDetails; 