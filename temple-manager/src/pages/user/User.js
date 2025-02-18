import React, { useState, useEffect } from 'react';
import UserList from '../../components/user/UserList';
import UserDetails from '../../components/user/UserDetails';
import UserForm from '../../components/user/UserForm';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/api';

function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (user) => {
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
        const newUser = await createUser(formData);
        setUsers([...users, newUser]);
      } else {
        const updatedUser = await updateUser(selectedUser.id, formData);
        setUsers(
          users.map((u) =>
            u.id === selectedUser.id ? updatedUser : u
          )
        );
        setSelectedUser(updatedUser);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding ? 'Failed to create user' : 'Failed to update user'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete user');
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
          <UserList
            users={users}
            onSelect={setSelectedUser}
            onAddNew={handleAddNew}
            selectedId={selectedUser?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <UserForm
              user={isEditing ? selectedUser : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <UserDetails
              user={selectedUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default User; 