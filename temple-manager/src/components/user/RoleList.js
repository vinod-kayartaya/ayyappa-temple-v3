import React from 'react';

function RoleList({ roles, onSelect, onAddNew, selectedId }) {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Roles</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {roles.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No roles found
          </div>
        ) : (
          roles.map((role) => (
            <button
              key={role.id}
              className={`list-group-item list-group-item-action ${
                selectedId === role.id ? 'active' : ''
              }`}
              onClick={() => onSelect(role)}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <strong>{role.role}</strong>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default RoleList; 