import React from 'react';

function SalesDetails({ sale, onEdit, onDelete }) {
  if (!sale) {
    return (
      <div className='card'>
        <div className='card-body text-center text-muted'>
          Select a sale to view details
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Sale Details</h5>
        <div>
          <button 
            className='btn btn-primary btn-sm me-2' 
            onClick={() => onEdit(sale)}
          >
            <i className='bi bi-pencil me-1'></i>Edit
          </button>
          <button 
            className='btn btn-danger btn-sm'
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this sale?')) {
                onDelete(sale.id);
              }
            }}
          >
            <i className='bi bi-trash me-1'></i>Delete
          </button>
        </div>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='text-muted'>Customer Name</label>
              <p className='mb-0'>{sale.customerName}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Mobile Number</label>
              <p className='mb-0'>{sale.customerMobile || 'N/A'}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Sale Date</label>
              <p className='mb-0'>{formatDate(sale.saleDate)}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Total Amount</label>
              <p className='mb-0'>{formatCurrency(sale.totalAmount)}</p>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='text-muted'>Created By</label>
              <p className='mb-0'>{sale.createdBy || 'N/A'}</p>
            </div>
            <div className='mb-3'>
              <label className='text-muted'>Created At</label>
              <p className='mb-0'>{formatDate(sale.createdAt)}</p>
            </div>
          </div>
        </div>

        <h6 className='mt-4 mb-3'>Sale Items</h6>
        <div className='table-responsive'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.items && sale.items.map(item => (
                <tr key={item.id}>
                  <td>{item.productName || 'N/A'} <small className='text-muted'>({item.productCode})</small></td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.unitPrice)}</td>
                  <td>{formatCurrency(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end fw-bold">Total:</td>
                <td className="fw-bold">{formatCurrency(sale.totalAmount)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesDetails; 