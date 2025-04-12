import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchUserWiseRevenueReport } from '../../../services/api';

function UserWiseRevenueReport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState([]);

  // Get dates from URL or use defaults
  const getInitialDates = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      startDate:
        searchParams.get('startDate') || firstDay.toISOString().split('T')[0],
      endDate: searchParams.get('endDate') || today.toISOString().split('T')[0],
    };
  };

  const [dateRange, setDateRange] = useState(getInitialDates());

  const loadRevenueReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserWiseRevenueReport(
        dateRange.startDate,
        dateRange.endDate
      );

      // Group data by date
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = [];
        }
        acc[item.date].push(item);
        return acc;
      }, {});

      setRevenueData(groupedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dateRange.startDate, dateRange.endDate]);

  useEffect(() => {
    // Update URL when dates change
    setSearchParams({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    loadRevenueReport();
  }, [dateRange, setSearchParams, loadRevenueReport]);

  // Also load report when URL params change directly
  useEffect(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
    }
  }, [searchParams]);

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalAmount = 0;

    Object.values(revenueData)
      .flat()
      .forEach((item) => {
        totalAmount += item.totalAmount;
      });

    return { totalAmount };
  };

  const { totalAmount } = calculateTotals();

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `UserWise_Revenue_${dateRange.startDate}_to_${dateRange.endDate}`;

    window.print();

    document.title = originalTitle;
  };

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center mb-4 d-print-none'>
            <h5 className='card-title mb-0'>Revenue Report (User Wise)</h5>
            <div className='d-flex gap-3'>
              <div className='d-flex gap-2'>
                <div>
                  <label className='form-label'>Start Date</label>
                  <input
                    type='date'
                    className='form-control'
                    value={dateRange.startDate}
                    onChange={(e) =>
                      handleDateChange('startDate', e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className='form-label'>End Date</label>
                  <input
                    type='date'
                    className='form-control'
                    value={dateRange.endDate}
                    onChange={(e) =>
                      handleDateChange('endDate', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='d-flex align-items-end'>
                <button
                  className='btn btn-primary'
                  onClick={handlePrint}
                  disabled={loading || Object.keys(revenueData).length === 0}
                >
                  <i className='bi bi-printer me-2'></i>
                  Print Report
                </button>
              </div>
            </div>
          </div>

          {/* Print Header */}
          <div className='d-none d-print-block report-header'>
            <h4>Revenue Report</h4>
            <p>From: {new Date(dateRange.startDate).toLocaleDateString()}</p>
            <p>To: {new Date(dateRange.endDate).toLocaleDateString()}</p>
          </div>

          {error && (
            <div className='alert alert-danger d-print-none'>{error}</div>
          )}

          {loading ? (
            <div className='text-center p-3 d-print-none'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : Object.keys(revenueData).length === 0 ? (
            <div className='alert alert-info d-print-none'>
              No revenue data found for the selected date range.
            </div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Bill No</th>
                    <th className='text-end'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(revenueData)
                    .sort(
                      ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
                    )
                    .map(([date, items]) => (
                      <React.Fragment key={date}>
                        {items.map((item, index) => (
                          <tr key={`${date}-${item.billNo}`}>
                            {index === 0 && (
                              <td rowSpan={items.length}>
                                {new Date(date).toLocaleDateString()}
                              </td>
                            )}
                            <td>{item.user}</td>
                            <td>{item.billNo}</td>
                            <td className='text-end'>
                              ₹{item.totalAmount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
                <tfoot>
                  <tr className='table-secondary fw-bold'>
                    <td colSpan='3' className='text-end'>
                      Total:
                    </td>
                    <td className='text-end'>₹{totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Print Footer */}
          <div className='d-none d-print-block text-center mt-4'>
            <p className='mb-1'>Generated on: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWiseRevenueReport;
