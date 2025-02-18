import React from 'react';

function RoleDetails({ role, onEdit, onDelete }) {
  if (!role) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select a role to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Role Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(role)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this role?')) {
                onDelete(role.id);
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
          <p className='mb-0'>{role.id}</p>
        </div>

        <div className='mb-3'>
          <label className='text-muted'>Role</label>
          <p className='mb-0'>{role.role}</p>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Created By</label>
            <p className='mb-0'>{role.createdBy}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Created At</label>
            <p className='mb-0'>{new Date(role.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleDetails; 