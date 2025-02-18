import React, { useState, useEffect } from 'react';
import DeityList from '../../components/masters/DeityList';
import DeityDetails from '../../components/masters/DeityDetails';
import DeityForm from '../../components/masters/DeityForm';
import {
  fetchDeities,
  createDeity,
  updateDeity,
  deleteDeity,
} from '../../services/api';

function Deities() {
  const [deities, setDeities] = useState([]);
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeities();
  }, []);

  const loadDeities = async () => {
    try {
      setLoading(true);
      const data = await fetchDeities();
      setDeities(data);
      setError(null);
    } catch (err) {
      setError('Failed to load deities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedDeity(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (deity) => {
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
        const newDeity = await createDeity(formData);
        setDeities([...deities, newDeity]);
      } else {
        const updatedDeity = await updateDeity(selectedDeity.id, formData);
        setDeities(
          deities.map((deity) =>
            deity.id === selectedDeity.id ? updatedDeity : deity
          )
        );
        setSelectedDeity(updatedDeity);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(isAdding ? 'Failed to create deity' : 'Failed to update deity');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDeity(id);
      setDeities(deities.filter((deity) => deity.id !== id));
      setSelectedDeity(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete deity');
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
          <DeityList
            deities={deities}
            onSelect={setSelectedDeity}
            onAddNew={handleAddNew}
            selectedId={selectedDeity?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <DeityForm
              deity={isEditing ? selectedDeity : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <DeityDetails
              deity={selectedDeity}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Deities; 