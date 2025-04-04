import React, { useState, useEffect } from 'react';
import Pagination from '../common/Pagination';

function SalesList({ sales, onSelect, selectedId, pagination, onPageChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSales(sales);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = sales.filter(sale => {
      return (
        (sale.customerName && sale.customerName.toLowerCase().includes(searchLower)) ||
        (sale.customerMobile && sale.customerMobile.toLowerCase().includes(searchLower))
      );
    });
    
    setFilteredSales(filtered);
  }, [searchTerm, sales]);

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
      <div className='card-body'>
        <div className='mb-4'>
          <h5 className='card-title mb-0'>Sales List</h5>
        </div>

        {/* Search Filter */}
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by customer name or mobile...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='list-group'>
          {filteredSales.length === 0 ? (
            <div className='list-group-item text-center text-muted'>
              {searchTerm ? 'No matching sales found' : 'No sales found'}
            </div>
          ) : (
            filteredSales.map((sale) => (
              <button
                key={sale.id}
                className={`list-group-item list-group-item-action ${
                  selectedId === sale.id ? 'active' : ''
                }`}
                onClick={() => onSelect(sale)}
              >
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <div className='fw-bold'>{sale.customerName}</div>
                    <small className={selectedId === sale.id ? 'text-light' : 'text-muted'}>
                      Mobile: {sale.customerMobile || 'N/A'}
                    </small>
                    <br />
                    <small className={selectedId === sale.id ? 'text-light' : 'text-muted'}>
                      Date: {formatDate(sale.saleDate)}
                    </small>
                    <br />
                    <small className={selectedId === sale.id ? 'text-light' : 'text-muted'}>
                      Items: {sale.items ? sale.items.length : 0}
                    </small>
                  </div>
                  <div className='text-end'>
                    <div className='fw-bold'>{formatCurrency(sale.totalAmount)}</div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {filteredSales.length > 0 && pagination && (
          <div className='mt-3'>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesList; 