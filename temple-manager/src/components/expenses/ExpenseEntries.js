import React from 'react';
import { useSelector } from 'react-redux';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';

function ExpenseEntries() {
  const { selectedExpense, showForm } = useSelector((state) => state.expenses);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className={selectedExpense || showForm ? 'col-md-6' : 'col-md-12'}>
          <ExpenseList />
        </div>
        {showForm && (
          <div className='col-md-6'>
            <ExpenseForm />
          </div>
        )}
        {selectedExpense && !showForm && (
          <div className='col-md-6'>
            <ExpenseDetails />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseEntries; 