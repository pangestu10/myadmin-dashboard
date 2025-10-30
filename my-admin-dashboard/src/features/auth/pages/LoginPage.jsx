import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/stores/authStore';
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Login to Admin</h3>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;