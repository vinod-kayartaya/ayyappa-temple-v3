import React from 'react';

function OfferingCategoryList({ offeringCategories, onSelect, onAddNew, selectedId }) {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Offering Categories</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {offeringCategories.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No offering categories found
          </div>
        ) : (
          offeringCategories.map((category) => (
            <button
              key={category.id}
              className={`list-group-item list-group-item-action ${
                selectedId === category.id ? 'active' : ''
              }`}
              onClick={() => onSelect(category)}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <strong>{category.name}</strong>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default OfferingCategoryList; 