import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createExpense,
  updateExpense,
  clearSelectedExpense,
} from '../../store/slices/expenseSlice';
import { fetchUsers, fetchExpenseCategories } from '../../services/api';

function ExpenseForm() {
  const dispatch = useDispatch();
  const { selectedExpense, loading } = useSelector((state) => state.expenses);
  const [formData, setFormData] = useState({
    id: '',
    voucherNo: '',
    date: new Date().toISOString().split('T')[0],
    paidTo: '',
    amount: '',
    towards: '',
    approvedBy: '',
    categoryId: '',
    expenseType: 'VOUCHER',
  });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (selectedExpense) {
      setFormData({
        id: selectedExpense.id,
        voucherNo: selectedExpense.voucherNo,
        date: new Date(selectedExpense.voucherDate).toISOString().split('T')[0],
        paidTo: selectedExpense.paidTo,
        amount: selectedExpense.amount,
        towards: selectedExpense.purpose,
        approvedBy: selectedExpense.approvedBy
          ? selectedExpense.approvedBy.id
          : '',
        categoryId: selectedExpense.category?.id || '',
        expenseType: selectedExpense.expenseType || 'VOUCHER',
      });
    }
  }, [selectedExpense]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingUsers(true);
        const [usersData, categoriesData] = await Promise.all([
          fetchUsers(),
          fetchExpenseCategories(),
        ]);
        setUsers(usersData);
        setExpenseCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load form data:', err);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.voucherNo ||
      !formData.paidTo.trim() ||
      !formData.amount ||
      !formData.towards.trim() ||
      !formData.categoryId
    ) {
      setError('Please fill all required fields');
      return;
    }

    try {
      if (selectedExpense) {
        await dispatch(updateExpense(formData)).unwrap();
      } else {
        await dispatch(createExpense(formData)).unwrap();
      }
      handleReset();
    } catch (err) {
      setError(
        err.message ||
          `Failed to ${selectedExpense ? 'update' : 'create'} expense`
      );
    }
  };

  const handleReset = () => {
    setFormData({
      id: '',
      voucherNo: '',
      date: new Date().toISOString().split('T')[0],
      paidTo: '',
      amount: '',
      towards: '',
      approvedBy: '',
      categoryId: '',
      expenseType: 'VOUCHER',
    });
    setError('');
    dispatch(clearSelectedExpense());
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>
          {selectedExpense ? 'Edit Expense' : 'New Expense'}
        </h5>

        {error && <div className='alert alert-danger'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>
              Expense Type <span className='text-danger'>*</span>
            </label>
            <div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='expenseType'
                  id='typeVoucher'
                  value='VOUCHER'
                  checked={formData.expenseType === 'VOUCHER'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expenseType: e.target.value,
                    }))
                  }
                />
                <label className='form-check-label' htmlFor='typeVoucher'>
                  Voucher
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='expenseType'
                  id='typeReceipt'
                  value='RECEIPT'
                  checked={formData.expenseType === 'RECEIPT'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expenseType: e.target.value,
                    }))
                  }
                />
                <label className='form-check-label' htmlFor='typeReceipt'>
                  Receipt
                </label>
              </div>
            </div>
          </div>

          <div className='mb-3'>
            <label className='form-label'>
              Date <span className='text-danger'>*</span>
            </label>
            <input
              type='date'
              className='form-control'
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>
              {formData.expenseType === 'VOUCHER'
                ? 'Voucher No.'
                : 'Receipt No.'}
              <span className='text-danger'>*</span>
            </label>
            <input
              type='number'
              className='form-control'
              value={formData.voucherNo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, voucherNo: e.target.value }))
              }
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>
              Paid to <span className='text-danger'>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              value={formData.paidTo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, paidTo: e.target.value }))
              }
              required
            />
          </div>

          <div className='mb-3'>
            <label className='form-label'>
              Amount <span className='text-danger'>*</span>
            </label>
            <div className='input-group'>
              <span className='input-group-text'>₹</span>
              <input
                type='number'
                className='form-control'
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className='mb-3'>
            <label className='form-label'>
              Purpose <span className='text-danger'>*</span>
            </label>
            <textarea
              className='form-control'
              rows='3'
              value={formData.towards}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, towards: e.target.value }))
              }
              required
            ></textarea>
          </div>

          <div className='mb-3'>
            <label htmlFor='categoryId' className='form-label'>
              Expense Category *
            </label>
            <select
              className={`form-select ${
                !formData.categoryId && error ? 'is-invalid' : ''
              }`}
              id='categoryId'
              name='categoryId'
              value={formData.categoryId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
              }
            >
              <option value=''>Select Category</option>
              {expenseCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {!formData.categoryId && error && (
              <div className='invalid-feedback'>Please select a category</div>
            )}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Approved By</label>
            <select
              className='form-select'
              value={formData.approvedBy}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, approvedBy: e.target.value }))
              }
            >
              <option value=''>Select Approver</option>
              {loadingUsers ? (
                <option disabled>Loading users...</option>
              ) : (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstname} {user.lastname}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className='d-flex justify-content-between'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className='spinner-border spinner-border-sm me-2'
                    role='status'
                    aria-hidden='true'
                  ></span>
                  {selectedExpense ? 'Updating...' : 'Saving...'}
                </>
              ) : selectedExpense ? (
                'Update Expense'
              ) : (
                'Save Expense'
              )}
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={handleReset}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
