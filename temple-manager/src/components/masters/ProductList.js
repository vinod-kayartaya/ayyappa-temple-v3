import React from 'react';

function ProductList({ products, onSelect, onAddNew, selectedId }) {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Products</h5>
        <button className='btn btn-primary btn-sm' onClick={onAddNew}>
          <i className='bi bi-plus-lg me-1'></i>Add New
        </button>
      </div>
      <div className='list-group list-group-flush'>
        {products.length === 0 ? (
          <div className='list-group-item text-center text-muted'>
            No products found
          </div>
        ) : (
          products.map((product) => (
            <button
              key={product.id}
              className={`list-group-item list-group-item-action ${
                selectedId === product.id ? 'active' : ''
              }`}
              onClick={() => onSelect(product)}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <small className='text-muted me-2'>{product.code}</small>
                  <strong>{product.name}</strong>
                </div>
                <small className='badge bg-secondary'>{product.unit}</small>
              </div>
              <small className={`d-block ${selectedId === product.id ? 'text-light' : 'text-muted'}`}>
                {product.categoryName} | ₹{product.price}
              </small>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList; 