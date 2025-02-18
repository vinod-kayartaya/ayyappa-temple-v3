import React, { useState, useEffect } from 'react';
import CategoryList from '../../components/masters/CategoryList';
import CategoryDetails from '../../components/masters/CategoryDetails';
import CategoryForm from '../../components/masters/CategoryForm';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../services/api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (category) => {
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
        const newCategory = await createCategory(formData);
        setCategories([...categories, newCategory]);
      } else {
        const updatedCategory = await updateCategory(
          selectedCategory.id,
          formData
        );
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id ? updatedCategory : cat
          )
        );
        setSelectedCategory(updatedCategory);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding ? 'Failed to create category' : 'Failed to update category'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat.id !== id));
      setSelectedCategory(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete category');
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
          <CategoryList
            categories={categories}
            onSelect={setSelectedCategory}
            onAddNew={handleAddNew}
            selectedId={selectedCategory?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <CategoryForm
              category={isEditing ? selectedCategory : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <CategoryDetails
              category={selectedCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
