import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, setSelectedExpense, setShowForm } from '../../store/slices/expenseSlice';

function ExpenseList() {
  const dispatch = useDispatch();
  const expenseState = useSelector((state) => state.expenses) || {
    items: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 0
  };
  
  const { items, loading, error, currentPage, totalPages } = expenseState;
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize] = useState(10);
  const [expenseTypeFilter, setExpenseTypeFilter] = useState('ALL');

  useEffect(() => {
    dispatch(fetchExpenses({ 
      page: currentPage, 
      size: pageSize, 
      ...dateRange 
    }));
  }, [dispatch, dateRange, currentPage, pageSize]);

  const filteredExpenses = items.filter(expense => {
    if (expenseTypeFilter !== 'ALL' && expense.expenseType !== expenseTypeFilter) {
      return false;
    }
    return expense.paidTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
           String(expense.voucherNo).includes(searchTerm);
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      dispatch(fetchExpenses({ 
        page: newPage, 
        size: pageSize, 
        ...dateRange 
      }));
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Expenses</h5>
          <button 
            className="btn btn-primary"
            onClick={() => dispatch(setShowForm(true))}
          >
            New Expense
          </button>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex gap-4 align-items-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="expenseTypeFilter"
                id="filterAll"
                value="ALL"
                checked={expenseTypeFilter === 'ALL'}
                onChange={(e) => setExpenseTypeFilter(e.target.value)}
              />
              <label className="form-check-label" htmlFor="filterAll">
                All
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="expenseTypeFilter"
                id="filterVoucher"
                value="VOUCHER"
                checked={expenseTypeFilter === 'VOUCHER'}
                onChange={(e) => setExpenseTypeFilter(e.target.value)}
              />
              <label className="form-check-label" htmlFor="filterVoucher">
                Vouchers
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="expenseTypeFilter"
                id="filterReceipt"
                value="RECEIPT"
                checked={expenseTypeFilter === 'RECEIPT'}
                onChange={(e) => setExpenseTypeFilter(e.target.value)}
              />
              <label className="form-check-label" htmlFor="filterReceipt">
                Receipts
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by number or paid to..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="text-center p-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Paid To</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr 
                    key={expense.id}
                    onClick={() => dispatch(setSelectedExpense(expense))}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{expense.voucherNo}</td>
                    <td>{new Date(expense.voucherDate).toLocaleDateString()}</td>
                    <td>{expense.expenseType === 'VOUCHER' ? 'Voucher' : 'Receipt'}</td>
                    <td>{expense.paidTo}</td>
                    <td className="text-end">₹{expense.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <nav aria-label="Expense list pagination">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseList; 