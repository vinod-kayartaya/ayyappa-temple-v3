import React from 'react';
import { useSelector } from 'react-redux';
import ExpenseList from '../../components/expenses/ExpenseList';
import ExpenseForm from '../../components/expenses/ExpenseForm';
import ExpenseDetails from '../../components/expenses/ExpenseDetails';

function ExpenseEntries() {
  const { selectedExpense, showForm } = useSelector((state) => state.expenses);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6'>
          <ExpenseList />
        </div>
        <div className='col-md-6'>
          {showForm && <ExpenseForm />}
          {selectedExpense && !showForm && <ExpenseDetails />}
        </div>
      </div>
    </div>
  );
}

export default ExpenseEntries;
