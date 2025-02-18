import React, { useState, useEffect } from 'react';
import SupplierList from '../../components/masters/SupplierList';
import SupplierDetails from '../../components/masters/SupplierDetails';
import SupplierForm from '../../components/masters/SupplierForm';
import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../../services/api';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await fetchSuppliers();
      setSuppliers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load suppliers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedSupplier(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (supplier) => {
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
        const newSupplier = await createSupplier(formData);
        setSuppliers([...suppliers, newSupplier]);
      } else {
        const updatedSupplier = await updateSupplier(
          selectedSupplier.id,
          formData
        );
        setSuppliers(
          suppliers.map((sup) =>
            sup.id === selectedSupplier.id ? updatedSupplier : sup
          )
        );
        setSelectedSupplier(updatedSupplier);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding ? 'Failed to create supplier' : 'Failed to update supplier'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setSuppliers(suppliers.filter((sup) => sup.id !== id));
      setSelectedSupplier(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete supplier');
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
          <SupplierList
            suppliers={suppliers}
            onSelect={setSelectedSupplier}
            onAddNew={handleAddNew}
            selectedId={selectedSupplier?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <SupplierForm
              supplier={isEditing ? selectedSupplier : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <SupplierDetails
              supplier={selectedSupplier}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
