import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import DateRangePicker from '../../components/common/DateRangePicker';
import Pagination from '../../components/common/Pagination';
import { fetchDevoteeOfferings, printBill } from '../../services/api';
import DevoteeOffering from '../../components/offerings/DevoteeOffering';

function Offerings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [offerings, setOfferings] = useState([]);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [printLoading, setPrintLoading] = useState({});  // Track printing state for each offering
  
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
  const [filteredOfferings, setFilteredOfferings] = useState(null);

  // Update URL when state changes
  const updateUrlParams = useCallback((params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const loadOfferings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDevoteeOfferings(
        dateRange.startDate.toISOString().split('T')[0],
        dateRange.endDate.toISOString().split('T')[0]
      );
      
      // Sort offerings by createdAt in descending order
      const sortedOfferings = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setOfferings(sortedOfferings);
      setPagination(prev => ({
        ...prev,
        totalElements: sortedOfferings.length,
        totalPages: Math.ceil(sortedOfferings.length / prev.size)
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
      setError('Failed to load offerings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dateRange, pagination.page, pagination.size, updateUrlParams]);

  useEffect(() => {
    loadOfferings();
  }, [loadOfferings]); // Now includes loadOfferings as a dependency

  useEffect(() => {
    // Update URL when search term changes
    updateUrlParams({ search: searchTerm || null });
    
    if (searchTerm) {
      const filtered = offerings.filter(offering => {
        const searchLower = searchTerm.toLowerCase();
        const hasMatchingName = offering.items.some(item => 
          item.devoteeName && item.devoteeName.toLowerCase().includes(searchLower)
        );
        const hasMatchingNakshatra = offering.items.some(item => 
          item.devoteeNakshtram && item.devoteeNakshtram.toLowerCase().includes(searchLower)
        );
        const hasMatchingPhone = offering.items.some(item => 
          item.devoteeMobileNumber && item.devoteeMobileNumber.includes(searchLower)
        );
        const matchesBillNumber = formatBillNumber(offering.id).includes(searchLower);
        
        return hasMatchingName || hasMatchingNakshatra || matchesBillNumber || hasMatchingPhone;
      });
      setFilteredOfferings(filtered);
    } else {
      setFilteredOfferings(null);
    }
  }, [searchTerm, offerings, updateUrlParams]); // Now includes updateUrlParams as a dependency

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

  const handleEdit = (offering) => {
    setSelectedOffering(offering);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedOffering(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this offering?')) {
      try {
        // TODO: Implement delete functionality once API is available
        // await deleteOffering(id);
        setOfferings(offerings.filter(offering => offering.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete offering');
        console.error(err);
      }
    }
  };

  const handlePrint = async (offering) => {
    if (window.confirm(`Are you sure you want to print receipt for Bill #${formatBillNumber(offering.id)}?`)) {
      try {
        setPrintLoading(prev => ({ ...prev, [offering.id]: true }));
        await printBill(offering);
        // Show success message (optional)
      } catch (err) {
        console.error('Print error:', err);
        setError('Failed to print receipt');
      } finally {
        setPrintLoading(prev => ({ ...prev, [offering.id]: false }));
      }
    }
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

  // Format bill number
  const formatBillNumber = (id) => {
    return String(id).padStart(6, '0');
  };

  if (loading && offerings.length === 0) {
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
    <div className='container-fluid mt-4'>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h5 className='card-title mb-0'>Offerings</h5>
            <div className='d-flex gap-3 align-items-center'>
              <div style={{ width: '300px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, star, phone or bill number..."
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

          <div className='table-responsive'>
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th>Bill #</th>
                  <th>Date</th>
                  <th>Offering Date</th>
                  <th>Devotee Name</th>
                  <th>Mobile</th>
                  <th>Star</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(filteredOfferings || offerings).map(offering => (
                  <tr key={offering.id}>
                    <td>{formatBillNumber(offering.id)}</td>
                    <td>{formatDate(offering.transactionDate)}</td>
                    <td>{formatDate(offering.offeringDate)}</td>
                    <td>{offering.items[0]?.devoteeName || 'N/A'}</td>
                    <td>{offering.items[0]?.devoteeMobileNumber || 'N/A'}</td>
                    <td>{offering.items[0]?.devoteeNakshtram || 'N/A'}</td>
                    <td>{offering.items.length}</td>
                    <td>{formatCurrency(offering.items.reduce((sum, item) => sum + item.amount, 0))}</td>
                    <td>
                      <button 
                        className='btn btn-link btn-sm p-0 me-2'
                        onClick={() => handleEdit(offering)}
                      >
                        <i className='bi bi-pencil'></i>
                      </button>
                      <button 
                        className='btn btn-link btn-sm p-0 me-2'
                        onClick={() => handlePrint(offering)}
                        disabled={printLoading[offering.id]}
                      >
                        {printLoading[offering.id] ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <i className='bi bi-printer'></i>
                        )}
                      </button>
                      <button 
                        className='btn btn-link btn-sm p-0 text-danger'
                        onClick={() => handleDelete(offering.id)}
                      >
                        <i className='bi bi-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {offerings.length > 0 && (
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
        </div>
      </div>

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
            width: '75%',
            backgroundColor: '#fff',
            zIndex: 1050,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 10px rgba(0,0,0,0.1)'
          }}>
            <div className='d-flex align-items-center p-3 border-bottom' style={{ backgroundColor: '#f8f9fa' }}>
              <h5 className='modal-title flex-grow-1 mb-0'>Edit Offering</h5>
              <button 
                type='button' 
                className='btn-close' 
                onClick={handleCancel}
                aria-label="Close"
              />
            </div>
            <div className='flex-grow-1 p-4' style={{ overflowY: 'auto' }}>
              <DevoteeOffering
                offering={selectedOffering}
                onSubmit={() => {
                  handleCancel();
                  loadOfferings();
                }}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Offerings; 