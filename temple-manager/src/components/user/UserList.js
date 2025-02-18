import React from 'react';

function UserList({ users, onSelect, onAddNew, selectedId }) {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Users</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {users.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No users found
          </div>
        ) : (
          users.map((user) => (
            <button
              key={user.id}
              className={`list-group-item list-group-item-action ${
                selectedId === user.id ? 'active' : ''
              }`}
              onClick={() => onSelect(user)}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <strong>{user.username}</strong>
                  <br />
                  <small className='text-muted'>
                    {user.firstname} {user.lastname}
                  </small>
                </div>
                <div>
                  <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default UserList; 