import React, { useState, useEffect } from 'react';
import { fetchExpensesReport } from '../../services/api';

function ExpensesReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    voucherCount: 0,
    voucherTotal: 0,
    receiptCount: 0,
    receiptTotal: 0,
  });

  const [filters, setFilters] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    expenseType: 'ALL',
  });

  useEffect(() => {
    const loadExpensesReport = async () => {
      try {
        setLoading(true);
        const data = await fetchExpensesReport(
          filters.startDate,
          filters.endDate,
          filters.expenseType
        );

        // Sort expenses by date in ascending order
        const sortedExpenses = (data.content || []).sort(
          (a, b) => new Date(a.voucherDate) - new Date(b.voucherDate)
        );

        setExpenses(sortedExpenses);

        // Calculate summary from the sorted data
        const summary = sortedExpenses.reduce(
          (acc, expense) => {
            acc.totalAmount += expense.amount;
            if (expense.expenseType === 'VOUCHER') {
              acc.voucherCount++;
              acc.voucherTotal += expense.amount;
            } else {
              acc.receiptCount++;
              acc.receiptTotal += expense.amount;
            }
            return acc;
          },
          {
            totalAmount: 0,
            voucherCount: 0,
            voucherTotal: 0,
            receiptCount: 0,
            receiptTotal: 0,
          }
        );

        setSummary(summary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExpensesReport();
  }, [filters]);

  const handleFilterClick = (type) => {
    setFilters((prev) => ({
      ...prev,
      expenseType: type === prev.expenseType ? 'ALL' : type,
    }));
  };

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Expenses Report</h5>

          {/* Filters */}
          <div className='row mb-4 d-print-none'>
            <div className='col-md-3'>
              <label className='form-label'>Start Date</label>
              <input
                type='date'
                className='form-control'
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, startDate: e.target.value }))
                }
              />
            </div>
            <div className='col-md-3'>
              <label className='form-label'>End Date</label>
              <input
                type='date'
                className='form-control'
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, endDate: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Date Range for Print View */}
          <div className='d-none d-print-block mb-4'>
            <div className='mb-3'>
              <strong>Date Range:</strong>{' '}
              {new Date(filters.startDate).toLocaleDateString()} to{' '}
              {new Date(filters.endDate).toLocaleDateString()}
            </div>
          </div>

          {/* Print Button */}
          <div className='d-flex justify-content-end mb-3 d-print-none'>
            <button className='btn btn-primary' onClick={() => window.print()}>
              <i className='bi bi-printer me-2'></i>Print Report
            </button>
          </div>

          {/* Summary Cards as Filter Buttons */}
          <div className='row mb-4 d-print-none'>
            <div className='col-md-2'>
              <div
                className={`card ${
                  filters.expenseType === 'ALL'
                    ? 'bg-primary text-white'
                    : 'bg-light'
                }`}
                role='button'
                onClick={() => handleFilterClick('ALL')}
                style={{ cursor: 'pointer' }}
              >
                <div className='card-body'>
                  <h6
                    className={`card-subtitle mb-2 ${
                      filters.expenseType === 'ALL'
                        ? 'text-light'
                        : 'text-muted'
                    }`}
                  >
                    Total Amount
                  </h6>
                  <h4 className='card-title'>
                    ₹{summary.totalAmount.toFixed(2)}
                  </h4>
                  <p
                    className={`card-text ${
                      filters.expenseType === 'ALL'
                        ? 'text-light'
                        : 'text-muted'
                    }`}
                  >
                    {summary.voucherCount + summary.receiptCount} entries
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-2'>
              <div
                className={`card ${
                  filters.expenseType === 'VOUCHER'
                    ? 'bg-primary text-white'
                    : 'bg-light'
                }`}
                role='button'
                onClick={() => handleFilterClick('VOUCHER')}
                style={{ cursor: 'pointer' }}
              >
                <div className='card-body'>
                  <h6
                    className={`card-subtitle mb-2 ${
                      filters.expenseType === 'VOUCHER'
                        ? 'text-light'
                        : 'text-muted'
                    }`}
                  >
                    Vouchers
                  </h6>
                  <h4 className='card-title'>
                    ₹{summary.voucherTotal.toFixed(2)}
                  </h4>
                  <p
                    className={`card-text ${
                      filters.expenseType === 'VOUCHER'
                        ? 'text-light'
                        : 'text-muted'
                    }`}
                  >
                    {summary.voucherCount} entries
                  </p>
                </div>
              </div>
            </div>
            <div className='col-md-2'>
              <div
                className={`card ${
                  filters.expenseType === 'RECEIPT'
                    ? 'bg-primary text-white'
                    : 'bg-light'
                }`}
                role='button'
                onClick={() => handleFilterClick('RECEIPT')}
                style={{ cursor: 'pointer' }}
              >
                <div className='card-body'>
                  <h6
                    className={`card-subtitle mb-2 ${
                      filters.expenseType === 'RECEIPT'
                        ? 'text-light'
                        : 'text-muted'
                    }`}
                  >
                    Receipts
                  </h6>
                  <h4 className='card-title'>
                    ₹{summary.receiptTotal.toFixed(2)}
                  </h4>
                  <p
                    className={`card-text ${
                      filters.expenseType === 'RECEIPT'
                        ? 'text-light'
                        : 'text-muted'
                    }`}
                  >
                    {summary.receiptCount} entries
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Report Table */}
          {error && <div className='alert alert-danger'>{error}</div>}

          {loading ? (
            <div className='text-center p-3'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className='table-responsive'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Number</th>
                      <th>Type</th>
                      <th>Paid To</th>
                      <th>Purpose</th>
                      <th>Category</th>
                      <th>Approved By</th>
                      <th
                        style={{
                          minWidth: '120px',
                          width: '200px',
                          textAlign: 'right',
                        }}
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>
                          {new Date(expense.voucherDate).toLocaleDateString()}
                        </td>
                        <td>{expense.voucherNo}</td>
                        <td>{expense.expenseType}</td>
                        <td>{expense.paidTo}</td>
                        <td>{expense.purpose}</td>
                        <td>{expense.category?.name || '-'}</td>
                        <td>
                          {expense.approvedBy
                            ? `${expense.approvedBy.firstname} ${expense.approvedBy.lastname}`
                            : '-'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          ₹{Math.round(expense.amount)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan='7'
                        style={{
                          textAlign: 'right',
                          borderBottom: '1px solid #dee2e6',
                        }}
                      >
                        <strong>Total:</strong>
                      </td>
                      <td
                        style={{
                          textAlign: 'right',
                          borderBottom: '1px solid #dee2e6',
                        }}
                      >
                        <strong>₹{Math.round(summary.totalAmount)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpensesReport;
