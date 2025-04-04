import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SalesForm from '../../components/sales/SalesForm';
import DateRangePicker from '../../components/common/DateRangePicker';
import Pagination from '../../components/common/Pagination';
import { 
  fetchSales, 
  createSale, 
  updateSale, 
  deleteSale,
} from '../../services/api';

function Sales() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize state from URL parameters
  const [dateRange, setDateRange] = useState({
    startDate: new Date(searchParams.get('startDate') || new Date().setDate(1)),
    endDate: new Date(searchParams.get('endDate') || new Date())
  });
  
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get('page')) || 0,
    size: parseInt(searchParams.get('size')) || 10,
    totalElements: 0,
    totalPages: 0
  });

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredSales, setFilteredSales] = useState(null);

  // Update URL when state changes
  const updateUrlParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  useEffect(() => {
    loadSales();
  }, [dateRange, pagination.page, pagination.size]); // Dependencies for loadSales

  useEffect(() => {
    // Update URL when search term changes
    updateUrlParams({ search: searchTerm || null });
    
    if (searchTerm) {
      const filtered = sales.filter(sale => 
        sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customerMobile?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSales(filtered);
    } else {
      setFilteredSales(null);
    }
  }, [searchTerm, sales]);

  const loadSales = async () => {
    try {
      setLoading(true);
      const response = await fetchSales({
        page: pagination.page,
        size: pagination.size,
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0]
      });
      setSales(response.content);
      setPagination(prev => ({
        ...prev,
        totalElements: response.totalElements,
        totalPages: response.totalPages
      }));
      setError(null);

      // Update URL with date range and pagination
      updateUrlParams({
        startDate: dateRange.startDate.toISOString().split('T')[0],
        endDate: dateRange.endDate.toISOString().split('T')[0],
        page: pagination.page.toString(),
        size: pagination.size.toString()
      });
    } catch (err) {
      setError('Failed to load sales');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedSale(null);
  };

  const handleSubmit = async (formData) => {
    try {
      const updatedSale = await updateSale(selectedSale.id, formData);
      setSales(sales.map(sale => 
        sale.id === selectedSale.id ? updatedSale : sale
      ));
      setIsEditing(false);
      setSelectedSale(null);
      setError(null);
      loadSales(); // Refresh the list
    } catch (err) {
      setError('Failed to update sale');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSale(id);
      setSales(sales.filter(sale => sale.id !== id));
      setSelectedSale(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete sale');
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    updateUrlParams({ page: newPage.toString() });
  };

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    setPagination(prev => ({ ...prev, page: 0 }));
    updateUrlParams({
      startDate: newRange.startDate.toISOString().split('T')[0],
      endDate: newRange.endDate.toISOString().split('T')[0],
      page: '0'
    });
  };

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

  if (loading && sales.length === 0) {
    return (
      <div className='container mt-4'>
        <div className='text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      
      <div className='mb-4'>
        <div className='d-flex justify-content-between align-items-end'>
          <h5 className='mb-0'>Sales</h5>
          <div className='d-flex gap-3 align-items-end'>
            <div>
              <label className='form-label small mb-1'>Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by customer name or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onChange={handleDateRangeChange}
            />
          </div>
        </div>
      </div>

      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Mobile</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredSales || sales).map(sale => (
              <tr key={sale.id}>
                <td>{formatDate(sale.saleDate)}</td>
                <td>{sale.customerName}</td>
                <td>{sale.customerMobile}</td>
                <td>{sale.items?.length || 0}</td>
                <td>{formatCurrency(sale.totalAmount)}</td>
                <td>
                  <button 
                    className='btn btn-link btn-sm p-0 me-2'
                    onClick={() => handleEdit(sale)}
                  >
                    <i className='bi bi-pencil'></i>
                  </button>
                  <button 
                    className='btn btn-link btn-sm p-0 text-danger'
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this sale?')) {
                        handleDelete(sale.id);
                      }
                    }}
                  >
                    <i className='bi bi-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sales.length > 0 && (
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <div className='text-muted'>
            Showing {pagination.page * pagination.size + 1} to {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of {pagination.totalElements} entries
          </div>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <>
          {/* Semi-transparent overlay for the left side */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: '50%',
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1040
          }} onClick={handleCancel} />

          {/* Edit panel on the right */}
          <div style={{ 
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundColor: '#fff',
            zIndex: 1050,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 10px rgba(0,0,0,0.1)'
          }}>
            <div className='d-flex align-items-center p-3 border-bottom' style={{ backgroundColor: '#f8f9fa' }}>
              <h5 className='modal-title flex-grow-1 mb-0'>Edit Sale</h5>
              <button 
                type='button' 
                className='btn-close' 
                onClick={handleCancel}
                aria-label="Close"
              />
            </div>
            <div className='flex-grow-1 p-4' style={{ overflowY: 'auto' }}>
              <SalesForm
                sale={selectedSale}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sales; 