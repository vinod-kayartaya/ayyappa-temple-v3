import React from 'react';

function VazhipaduList({ vazhipadus, onSelect, onAddNew, selectedId }) {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Vazhipadus</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {vazhipadus.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No vazhipadus found
          </div>
        ) : (
          vazhipadus.map((vazhipadu) => (
            <button
              key={vazhipadu.id}
              className={`list-group-item list-group-item-action ${
                selectedId === vazhipadu.id ? 'active' : ''
              }`}
              onClick={() => onSelect(vazhipadu)}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <small className='text-muted me-2'>{vazhipadu.code}</small>
                  <strong>{vazhipadu.vazhipaduName}</strong>
                </div>
                <div>
                  <span className={`badge ${selectedId === vazhipadu.id ? 'bg-light text-primary' : 'bg-primary'}`}>
                    ₹{vazhipadu.amount}
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

export default VazhipaduList; 