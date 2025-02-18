import React from 'react';

function ProductDetails({ product, onEdit, onDelete }) {
  if (!product) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select a product to view details
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Product Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(product)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this product?')) {
                onDelete(product.id);
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
          <p className='mb-0'>{product.id}</p>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Code</label>
            <p className='mb-0'>{product.code}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Unit</label>
            <p className='mb-0'>{product.unit}</p>
          </div>
        </div>

        <div className='mb-3'>
          <label className='text-muted'>Name</label>
          <p className='mb-0'>{product.name}</p>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Supplier</label>
            <p className='mb-0'>{product.supplierName}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Category</label>
            <p className='mb-0'>{product.categoryName}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label className='text-muted'>Price</label>
            <p className='mb-0'>₹{product.price}</p>
          </div>
          <div className='col-md-6'>
            <label className='text-muted'>Cost Price</label>
            <p className='mb-0'>₹{product.costPrice}</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-4'>
            <label className='text-muted'>Commission %</label>
            <p className='mb-0'>{product.commissionPercentage}%</p>
          </div>
          <div className='col-md-4'>
            <label className='text-muted'>Tax %</label>
            <p className='mb-0'>{product.taxPercentage}%</p>
          </div>
          <div className='col-md-4'>
            <label className='text-muted'>AST %</label>
            <p className='mb-0'>{product.astPercentage}%</p>
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-4'>
            <label className='text-muted'>Opening Stock</label>
            <p className='mb-0'>{product.openingStock}</p>
          </div>
          <div className='col-md-4'>
            <label className='text-muted'>Quantity in Stock</label>
            <p className='mb-0'>{product.quantityInStock}</p>
          </div>
          <div className='col-md-4'>
            <label className='text-muted'>Blocked</label>
            <p className='mb-0'>{product.blocked}</p>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-3 mb-3'>
            <label className='text-muted'>Issued</label>
            <p className='mb-0'>{product.issued}</p>
          </div>
          <div className='col-md-3 mb-3'>
            <label className='text-muted'>Received</label>
            <p className='mb-0'>{product.received}</p>
          </div>
          <div className='col-md-3 mb-3'>
            <label className='text-muted'>Damaged</label>
            <p className='mb-0'>{product.damaged}</p>
          </div>
          <div className='col-md-3 mb-3'>
            <label className='text-muted'>Sales Returned</label>
            <p className='mb-0'>{product.salesReturned}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails; 