import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchRevenueReport } from '../../../services/api';

function DailyRevenueReport() {
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
      const data = await fetchRevenueReport(
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
    let totalCount = 0;

    Object.values(revenueData).forEach((dateData) => {
      dateData.forEach((item) => {
        totalAmount += item.totalAmount;
        totalCount += item.totalCount;
      });
    });

    return { totalAmount, totalCount };
  };

  const { totalAmount, totalCount } = calculateTotals();

  const handlePrint = () => {
    // Set a descriptive document title
    const originalTitle = document.title;
    document.title = `Daily_Revenue_${dateRange.startDate}_to_${dateRange.endDate}`;

    window.print();

    // Restore the original title after printing
    document.title = originalTitle;
  };

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center mb-4 d-print-none'>
            <h5 className='card-title mb-0'>Daily Revenue Report</h5>
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

          {/* Updated Print Header */}
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
                    <th>Offering Type</th>
                    <th className='text-end'>Count</th>
                    <th className='text-end'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(revenueData).map(([date, items]) => (
                    <React.Fragment key={date}>
                      {items.map((item, index) => (
                        <tr key={`${date}-${index}`}>
                          {index === 0 && (
                            <td rowSpan={items.length}>
                              {new Date(date).toLocaleDateString()}
                            </td>
                          )}
                          <td>{item.offeringType}</td>
                          <td className='text-end'>{item.totalCount}</td>
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
                    <td colSpan='2' className='text-end'>
                      Total:
                    </td>
                    <td className='text-end'>{totalCount}</td>
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

export default DailyRevenueReport;
