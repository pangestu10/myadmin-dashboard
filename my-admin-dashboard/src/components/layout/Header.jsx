import React from 'react';
import { useAuthStore } from '@/lib/stores/authStore';
import { useTheme } from '@/hooks/useTheme';
import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <button onClick={onMenuClick} className="lg:hidden">
          <Bars3Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;