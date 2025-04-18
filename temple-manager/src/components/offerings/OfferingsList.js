import React, { useState, useEffect } from 'react';
import { fetchDevoteeOfferings } from '../../services/api';

function OfferingsList() {
  const [offerings, setOfferings] = useState([]);
  const [filteredOfferings, setFilteredOfferings] = useState([]);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [searchTerm, setSearchTerm] = useState('');

  const loadOfferings = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDevoteeOfferings(
        dateRange.startDate,
        dateRange.endDate
      );
      
      // Sort offerings by createdAt in descending order
      const sortedOfferings = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setOfferings(sortedOfferings);
      setFilteredOfferings(sortedOfferings);
      setSelectedOffering(null);
    } catch (err) {
      setError('Failed to load offerings');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    loadOfferings();
  }, [loadOfferings]);

  // Add a helper function to format bill number
  const formatBillNumber = (id) => {
    return String(id).padStart(6, '0');
  };

  // Update the search filter
  useEffect(() => {
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
  }, [searchTerm, offerings]);

  const handleOfferingSelect = (offering) => {
    setSelectedOffering(offering);
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        {/* Left Column - List */}
        <div className='col-md-5'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title mb-4'>Offerings List</h5>

              {/* Date Range Filters */}
              <div className='row mb-4'>
                <div className='col-md-6'>
                  <label className='form-label'>Start Date</label>
                  <input
                    type='date'
                    className='form-control'
                    value={dateRange.startDate}
                    onChange={(e) =>
                      setDateRange((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className='col-md-6'>
                  <label className='form-label'>End Date</label>
                  <input
                    type='date'
                    className='form-control'
                    value={dateRange.endDate}
                    onChange={(e) =>
                      setDateRange((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Search Filter */}
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search by name, star, phone or bill number...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Offerings List */}
              {loading ? (
                <div className='text-center'>
                  <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className='alert alert-danger'>{error}</div>
              ) : (
                <div className='list-group'>
                  {filteredOfferings.map((offering) => (
                    <button
                      key={offering.id}
                      className={`list-group-item list-group-item-action ${
                        selectedOffering?.id === offering.id ? 'active' : ''
                      }`}
                      onClick={() => handleOfferingSelect(offering)}
                    >
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>
                          <div className='fw-bold'>
                            {offering.items[0]?.devoteeName || 'Unknown'}
                          </div>
                          <small>Bill #: {formatBillNumber(offering.id)}</small>
                          <br />
                          <small>
                            Transaction: {new Date(offering.transactionDate).toLocaleDateString()}
                          </small>
                          <br />
                          <small>
                            Offering: {new Date(offering.offeringDate).toLocaleDateString()}
                          </small>
                          <br />
                          <small>
                            Phone: {offering.items[0]?.devoteeMobileNumber || 'N/A'}
                          </small>
                        </div>
                        <div className='text-end'>
                          <div>{offering.items.length} item(s)</div>
                          <div>
                            ₹{offering.items.reduce((sum, item) => sum + item.amount, 0)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className='col-md-7'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title mb-4'>Offering Details</h5>

              {selectedOffering ? (
                <>
                  <div className='mb-4'>
                    <h6>Transaction Information</h6>
                    <p className='mb-1'>
                      <strong>Bill #:</strong> {formatBillNumber(selectedOffering.id)}
                    </p>
                    <p className='mb-1'>
                      <strong>Phone:</strong> {selectedOffering.items[0]?.devoteeMobileNumber || 'N/A'}
                    </p>
                    <p className='mb-1'>
                      Transaction Date: {new Date(selectedOffering.transactionDate).toLocaleDateString()}
                    </p>
                    <p className='mb-1'>
                      Offering Date: {new Date(selectedOffering.offeringDate).toLocaleDateString()}
                    </p>
                    <p className='mb-1'>Created By: {selectedOffering.createdBy}</p>
                    <p className='mb-1'>
                      Created At: {new Date(selectedOffering.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h6>Items</h6>
                    <div className='table-responsive'>
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th>Devotee</th>
                            <th>Star</th>
                            <th>Vazhipadu</th>
                            <th>Deity</th>
                            <th>Nos</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOffering.items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.devoteeName}</td>
                              <td>{item.devoteeNakshtram}</td>
                              <td>{item.vazhipadu.vazhipaduName}</td>
                              <td>{item.deityName || '-'}</td>
                              <td>{item.nos}</td>
                              <td>₹{item.amount}</td>
                            </tr>
                          ))}
                          <tr className='table-secondary'>
                            <td colSpan='5' className='text-end fw-bold'>
                              Total:
                            </td>
                            <td className='fw-bold'>
                              ₹
                              {selectedOffering.items.reduce(
                                (sum, item) => sum + item.amount,
                                0
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className='text-center text-muted'>
                  Select an offering from the list to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferingsList;
