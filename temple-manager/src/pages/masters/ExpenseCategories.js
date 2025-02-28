import React, { useState, useEffect } from 'react';
import ExpenseCategoryList from '../../components/masters/ExpenseCategoryList';
import ExpenseCategoryDetails from '../../components/masters/ExpenseCategoryDetails';
import ExpenseCategoryForm from '../../components/masters/ExpenseCategoryForm';
import {
  fetchExpenseCategories,
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} from '../../services/api';

function ExpenseCategories() {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenseCategories();
  }, []);

  const loadExpenseCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchExpenseCategories();
      setExpenseCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load expense categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedExpenseCategory(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (category) => {
    setSelectedExpenseCategory(category);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isAdding) {
        const newCategory = await createExpenseCategory(formData);
        setExpenseCategories([...expenseCategories, newCategory]);
      } else {
        const updatedCategory = await updateExpenseCategory(
          selectedExpenseCategory.id,
          formData
        );
        setExpenseCategories(
          expenseCategories.map((cat) =>
            cat.id === selectedExpenseCategory.id ? updatedCategory : cat
          )
        );
        setSelectedExpenseCategory(updatedCategory);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding ? 'Failed to create expense category' : 'Failed to update expense category'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpenseCategory(id);
      setExpenseCategories(expenseCategories.filter((cat) => cat.id !== id));
      setSelectedExpenseCategory(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete expense category');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className='container mt-4'>
        <div className='text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      <div className='row'>
        <div className='col-md-4'>
          <ExpenseCategoryList
            categories={expenseCategories}
            onSelect={setSelectedExpenseCategory}
            onAddNew={handleAddNew}
            selectedId={selectedExpenseCategory?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <ExpenseCategoryForm
              category={isEditing ? selectedExpenseCategory : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <ExpenseCategoryDetails
              category={selectedExpenseCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseCategories; 