import React, { useState, useEffect } from 'react';
import RoleList from '../../components/user/RoleList';
import RoleDetails from '../../components/user/RoleDetails';
import RoleForm from '../../components/user/RoleForm';
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from '../../services/api';

function Role() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await fetchRoles();
      setRoles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load roles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedRole(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (role) => {
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
        const newRole = await createRole(formData);
        setRoles([...roles, newRole]);
      } else {
        const updatedRole = await updateRole(selectedRole.id, formData);
        setRoles(
          roles.map((r) =>
            r.id === selectedRole.id ? updatedRole : r
          )
        );
        setSelectedRole(updatedRole);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding ? 'Failed to create role' : 'Failed to update role'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      setRoles(roles.filter((r) => r.id !== id));
      setSelectedRole(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete role');
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
          <RoleList
            roles={roles}
            onSelect={setSelectedRole}
            onAddNew={handleAddNew}
            selectedId={selectedRole?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <RoleForm
              role={isEditing ? selectedRole : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <RoleDetails
              role={selectedRole}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Role; 