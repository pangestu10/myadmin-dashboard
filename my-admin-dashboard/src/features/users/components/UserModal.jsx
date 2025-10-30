import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api/services';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/ui/Button';

const UserModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Editor' });
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotification();

  const isEditing = !!user;

  useEffect(() => {
    if (isEditing) {
      setFormData({ name: user.name, email: user.email, role: user.role });
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await apiClient.put(`/users/${user.id}`, formData);
        notify({ type: 'success', message: 'User updated successfully.' });
      } else {
        await apiClient.post('/users', formData);
        notify({ type: 'success', message: 'User created successfully.' });
      }
      onClose();
      window.location.reload(); // Simple way to refresh table data
    } catch (error) {
      notify({ type: 'error', message: `Failed to ${isEditing ? 'update' : 'create'} user.` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {isEditing ? 'Edit User' : 'Add New User'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;