import React from 'react';

function UserDetails({ user, onEdit, onDelete }) {
  if (!user) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select a user to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>User Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(user)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this user?')) {
                onDelete(user.id);
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
          <p className='mb-0'>{user.id}</p>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Username</label>
            <p className='mb-0'>{user.username}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Status</label>
            <p className='mb-0'>
              <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>First Name</label>
            <p className='mb-0'>{user.firstname}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Last Name</label>
            <p className='mb-0'>{user.lastname}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Primary Email</label>
            <p className='mb-0'>{user.primaryEmail}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Primary Phone</label>
            <p className='mb-0'>{user.primaryPhone}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Secondary Email</label>
            <p className='mb-0'>{user.secondaryEmail || 'N/A'}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Secondary Phone</label>
            <p className='mb-0'>{user.secondaryPhone || 'N/A'}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Designation</label>
            <p className='mb-0'>{user.designation}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Password Last Changed</label>
            <p className='mb-0'>{new Date(user.passwordLastChanged).toLocaleString()}</p>
          </div>
        </div>

        <div className='mb-3'>
          <label className='text-muted'>Roles</label>
          <div>
            {user.roles.map(role => (
              <span key={role.id} className='badge bg-primary me-1'>
                {role.role}
              </span>
            ))}
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-3'>
            <label className='text-muted'>Created By</label>
            <p className='mb-0'>{user.createdBy}</p>
          </div>
          <div className='col-md-3'>
            <label className='text-muted'>Created At</label>
            <p className='mb-0'>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
          {user.lastUpdatedBy && (
            <div className='col-md-3'>
              <label className='text-muted'>Last Updated By</label>
              <p className='mb-0'>{user.lastUpdatedBy}</p>
            </div>
          )}
          {user.lastUpdatedAt && (
            <div className='col-md-3'>
              <label className='text-muted'>Last Updated At</label>
              <p className='mb-0'>{new Date(user.lastUpdatedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetails; 