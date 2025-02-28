import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowForm } from '../../store/slices/expenseSlice';

function ExpenseDetails() {
  const dispatch = useDispatch();
  const { selectedExpense } = useSelector((state) => state.expenses);

  const handleEdit = () => {
    dispatch(setShowForm(true));
  };

  if (!selectedExpense) return null;

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title mb-0">Expense Details</h5>
          <button 
            className="btn btn-primary"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Type</div>
          <div className="col-8">{selectedExpense.expenseType}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Number</div>
          <div className="col-8">{selectedExpense.voucherNo}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Date</div>
          <div className="col-8">
            {new Date(selectedExpense.voucherDate).toLocaleDateString()}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Paid To</div>
          <div className="col-8">{selectedExpense.paidTo}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Amount</div>
          <div className="col-8">₹{selectedExpense.amount.toFixed(2)}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Purpose</div>
          <div className="col-8">{selectedExpense.purpose}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Category</div>
          <div className="col-8">{selectedExpense.category?.name || '-'}</div>
        </div>

        {selectedExpense.approvedBy && (
          <div className="row mb-3">
            <div className="col-4 text-muted">Approved By</div>
            <div className="col-8">
              {`${selectedExpense.approvedBy.firstname} ${selectedExpense.approvedBy.lastname}`}
            </div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-4 text-muted">Created By</div>
          <div className="col-8">{selectedExpense.createdBy}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 text-muted">Created At</div>
          <div className="col-8">
            {new Date(selectedExpense.createdAt).toLocaleString()}
          </div>
        </div>

        {selectedExpense.lastUpdatedBy && (
          <>
            <div className="row mb-3">
              <div className="col-4 text-muted">Last Updated By</div>
              <div className="col-8">{selectedExpense.lastUpdatedBy}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Last Updated At</div>
              <div className="col-8">
                {new Date(selectedExpense.lastUpdatedAt).toLocaleString()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExpenseDetails; 