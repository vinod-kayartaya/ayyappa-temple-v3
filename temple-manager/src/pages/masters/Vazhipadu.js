import React, { useState, useEffect } from 'react';
import VazhipaduList from '../../components/masters/VazhipaduList';
import VazhipaduDetails from '../../components/masters/VazhipaduDetails';
import VazhipaduForm from '../../components/masters/VazhipaduForm';
import {
  fetchVazhipadus,
  createVazhipadu,
  updateVazhipadu,
  deleteVazhipadu,
} from '../../services/api';

function Vazhipadu() {
  const [vazhipadus, setVazhipadus] = useState([]);
  const [selectedVazhipadu, setSelectedVazhipadu] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVazhipadus();
  }, []);

  const loadVazhipadus = async () => {
    try {
      setLoading(true);
      const data = await fetchVazhipadus();
      setVazhipadus(data);
      setError(null);
    } catch (err) {
      setError('Failed to load vazhipadus');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedVazhipadu(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (vazhipadu) => {
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
        const newVazhipadu = await createVazhipadu(formData);
        setVazhipadus([...vazhipadus, newVazhipadu]);
      } else {
        const updatedVazhipadu = await updateVazhipadu(selectedVazhipadu.id, formData);
        setVazhipadus(
          vazhipadus.map((v) =>
            v.id === selectedVazhipadu.id ? updatedVazhipadu : v
          )
        );
        setSelectedVazhipadu(updatedVazhipadu);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding ? 'Failed to create vazhipadu' : 'Failed to update vazhipadu'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVazhipadu(id);
      setVazhipadus(vazhipadus.filter((v) => v.id !== id));
      setSelectedVazhipadu(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete vazhipadu');
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
          <VazhipaduList
            vazhipadus={vazhipadus}
            onSelect={setSelectedVazhipadu}
            onAddNew={handleAddNew}
            selectedId={selectedVazhipadu?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <VazhipaduForm
              vazhipadu={isEditing ? selectedVazhipadu : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <VazhipaduDetails
              vazhipadu={selectedVazhipadu}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Vazhipadu; 