import React from 'react';

function DonationCategoryList({ categories, onSelect, onAddNew, selectedId }) {
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Donation Categories</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {categories.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No donation categories found
          </div>
        ) : (
          categories.map((category) => (
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
              <small className={`d-block ${selectedId === category.id ? 'text-light' : 'text-muted'}`}>
                {truncateText(category.description, 50)}
              </small>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default DonationCategoryList; 