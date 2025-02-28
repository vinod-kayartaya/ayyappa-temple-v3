import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async ({ page = 0, size = 10, startDate, endDate }) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cash-expenses?page=${page}&size=${size}${
        startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : ''
      }`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch expenses');
    }
    return response.json();
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expenseData) => {
    const payload = {
      voucherNo: Number(expenseData.voucherNo),
      voucherDate: expenseData.date,
      paidTo: expenseData.paidTo,
      amount: Number(expenseData.amount),
      purpose: expenseData.towards,
      approvedBy: expenseData.approvedBy ? Number(expenseData.approvedBy) : null,
      categoryId: expenseData.categoryId,
      expenseType: expenseData.expenseType
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cash-expenses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create expense');
    }
    return response.json();
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async (expenseData) => {
    const payload = {
      voucherNo: Number(expenseData.voucherNo),
      voucherDate: expenseData.date,
      paidTo: expenseData.paidTo,
      amount: Number(expenseData.amount),
      purpose: expenseData.towards,
      approvedBy: expenseData.approvedBy ? Number(expenseData.approvedBy) : null,
      categoryId: expenseData.categoryId,
      expenseType: expenseData.expenseType
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cash-expenses/${expenseData.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update expense');
    }
    return response.json();
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0,
  selectedExpense: null,
  showForm: false
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setSelectedExpense: (state, action) => {
      state.selectedExpense = action.payload;
      state.showForm = false;
    },
    clearSelectedExpense: (state) => {
      state.selectedExpense = null;
      state.showForm = false;
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload;
      if (action.payload && !state.selectedExpense?.id) {
        state.selectedExpense = null;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content;
        state.currentPage = action.payload.number;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          item => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedExpense = null;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedExpense, clearSelectedExpense, setShowForm, setCurrentPage } = expenseSlice.actions;
export default expenseSlice.reducer; 