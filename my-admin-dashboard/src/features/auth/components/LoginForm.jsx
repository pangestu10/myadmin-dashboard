import React, { useState } from 'react';
import { useAuthStore } from '@/lib/stores/authStore';
import apiClient from '@/lib/api/services';
import { useNotification } from '@/hooks/useNotification';
import Button from '@/components/ui/Button';

const LoginForm = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const { notify } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post('/login', { email, password });
      const { user, token } = response.data;
      login(user, token);
      notify({ type: 'success', message: `Welcome back, ${user.name}!` });
    } catch (error) {
      notify({ type: 'error', message: 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Forgot Password?</a>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-4">
        Use <strong>admin@example.com</strong> / <strong>password</strong> for Admin role, or <strong>editor@example.com</strong> for Editor role.
      </p>
    </form>
  );
};

export default LoginForm;