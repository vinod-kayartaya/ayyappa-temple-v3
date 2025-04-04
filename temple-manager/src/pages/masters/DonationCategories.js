import React, { useState, useEffect } from 'react';
import DonationCategoryList from '../../components/masters/DonationCategoryList';
import DonationCategoryDetails from '../../components/masters/DonationCategoryDetails';
import DonationCategoryForm from '../../components/masters/DonationCategoryForm';
import {
  fetchDonationCategories,
  createDonationCategory,
  updateDonationCategory,
  deleteDonationCategory,
} from '../../services/api';

function DonationCategories() {
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
      const data = await fetchDonationCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load donation categories');
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
        const newCategory = await createDonationCategory(formData);
        setCategories([...categories, newCategory]);
      } else {
        const updatedCategory = await updateDonationCategory(
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
        isAdding ? 'Failed to create donation category' : 'Failed to update donation category'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDonationCategory(id);
      setCategories(categories.filter((cat) => cat.id !== id));
      setSelectedCategory(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete donation category');
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
          <DonationCategoryList
            categories={categories}
            onSelect={setSelectedCategory}
            onAddNew={handleAddNew}
            selectedId={selectedCategory?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <DonationCategoryForm
              category={isEditing ? selectedCategory : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <DonationCategoryDetails
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

export default DonationCategories; 