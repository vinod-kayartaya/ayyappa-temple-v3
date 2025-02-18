import React from 'react';

function SupplierList({ suppliers, onSelect, onAddNew, selectedId }) {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Suppliers</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {suppliers.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No suppliers found
          </div>
        ) : (
          suppliers.map((supplier) => (
            <button
              key={supplier.id}
              className={`list-group-item list-group-item-action ${
                selectedId === supplier.id ? 'active' : ''
              }`}
              onClick={() => onSelect(supplier)}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <small className='text-muted me-2'>{supplier.code}</small>
                  <strong>{supplier.name}</strong>
                  <small className='text-muted ms-2'>({supplier.shortForm})</small>
                </div>
              </div>
              <small className={`d-block ${selectedId === supplier.id ? 'text-light' : 'text-muted'}`}>
                {supplier.phone} | {supplier.email}
              </small>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default SupplierList; 