import React, { useState, useEffect } from 'react';
import OfferingCategoryList from '../../components/masters/OfferingCategoryList';
import OfferingCategoryDetails from '../../components/masters/OfferingCategoryDetails';
import OfferingCategoryForm from '../../components/masters/OfferingCategoryForm';
import {
  fetchOfferingCategories,
  createOfferingCategory,
  updateOfferingCategory,
  deleteOfferingCategory,
} from '../../services/api';

function OfferingCategories() {
  const [offeringCategories, setOfferingCategories] = useState([]);
  const [selectedOfferingCategory, setSelectedOfferingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOfferingCategories();
  }, []);

  const loadOfferingCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchOfferingCategories();
      setOfferingCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load offering categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedOfferingCategory(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (offeringCategory) => {
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
        const newOfferingCategory = await createOfferingCategory(formData);
        setOfferingCategories([...offeringCategories, newOfferingCategory]);
      } else {
        const updatedOfferingCategory = await updateOfferingCategory(
          selectedOfferingCategory.id,
          formData
        );
        setOfferingCategories(
          offeringCategories.map((cat) =>
            cat.id === selectedOfferingCategory.id ? updatedOfferingCategory : cat
          )
        );
        setSelectedOfferingCategory(updatedOfferingCategory);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding
          ? 'Failed to create offering category'
          : 'Failed to update offering category'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOfferingCategory(id);
      setOfferingCategories(offeringCategories.filter((cat) => cat.id !== id));
      setSelectedOfferingCategory(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete offering category');
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
          <OfferingCategoryList
            offeringCategories={offeringCategories}
            onSelect={setSelectedOfferingCategory}
            onAddNew={handleAddNew}
            selectedId={selectedOfferingCategory?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <OfferingCategoryForm
              offeringCategory={isEditing ? selectedOfferingCategory : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <OfferingCategoryDetails
              offeringCategory={selectedOfferingCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default OfferingCategories; 