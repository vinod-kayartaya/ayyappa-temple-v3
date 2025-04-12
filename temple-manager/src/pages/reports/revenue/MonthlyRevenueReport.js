import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMonthlyRevenueReport } from '../../../services/api';

function MonthlyRevenueReport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState([]);

  // Get year from URL or use default
  const getInitialYear = () => {
    return Number(searchParams.get('year')) || new Date().getFullYear();
  };

  const [selectedYear, setSelectedYear] = useState(getInitialYear);

  // Generate year options (last 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const loadMonthlyRevenueReport = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMonthlyRevenueReport(selectedYear);
      
      // Group data by month
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.monthYear]) {
          acc[item.monthYear] = [];
        }
        acc[item.monthYear].push(item);
        return acc;
      }, {});

      setRevenueData(groupedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    // Update URL when year changes
    setSearchParams({ year: selectedYear });
    loadMonthlyRevenueReport();
  }, [selectedYear, setSearchParams, loadMonthlyRevenueReport]);

  // Also load report when URL params change directly
  useEffect(() => {
    const year = searchParams.get('year');
    if (year) {
      setSelectedYear(Number(year));
    }
  }, [searchParams]);

  const handleYearChange = (value) => {
    setSelectedYear(Number(value));
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalAmount = 0;
    let totalCount = 0;

    Object.values(revenueData).forEach(monthData => {
      monthData.forEach(item => {
        totalAmount += item.totalAmount;
        totalCount += item.totalCount;
      });
    });

    return { totalAmount, totalCount };
  };

  const { totalAmount, totalCount } = calculateTotals();

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Monthly_Revenue_${selectedYear}`;
    
    window.print();
    
    document.title = originalTitle;
  };

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center mb-4 d-print-none'>
            <h5 className='card-title mb-0'>Monthly Revenue Report</h5>
            <div className='d-flex gap-3'>
              <div>
                <label className='form-label'>Select Year</label>
                <select
                  className='form-select'
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
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
            <h4>Monthly Revenue Report - {selectedYear}</h4>
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
              No revenue data found for the selected year.
            </div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Offering Type</th>
                    <th className='text-end'>Count</th>
                    <th className='text-end'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(revenueData).map(([monthYear, items]) => (
                    <React.Fragment key={monthYear}>
                      {items.map((item, index) => (
                        <tr key={`${monthYear}-${index}`}>
                          {index === 0 && (
                            <td rowSpan={items.length}>{monthYear}</td>
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

export default MonthlyRevenueReport; 