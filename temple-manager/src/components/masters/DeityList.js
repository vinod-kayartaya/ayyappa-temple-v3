import React from 'react';

function DeityList({ deities, onSelect, onAddNew, selectedId }) {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Deities</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {deities.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No deities found
          </div>
        ) : (
          deities.map((deity) => (
            <button
              key={deity.id}
              className={`list-group-item list-group-item-action ${
                selectedId === deity.id ? 'active' : ''
              }`}
              onClick={() => onSelect(deity)}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <strong>{deity.name}</strong>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default DeityList; 