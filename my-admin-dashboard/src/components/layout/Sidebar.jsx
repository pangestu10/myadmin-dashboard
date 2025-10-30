import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@/lib/stores/authStore';
import {
  HomeIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
    { name: 'Manajemen User', to: '/users', icon: UserGroupIcon, roles: ['Admin'] },
  ];

  const filteredNavigation = navigation.filter(item => !item.roles || item.roles.includes(user?.role));

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900 dark:bg-gray-950">
          <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
          <button onClick={onClose} className="lg:hidden text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-5 px-3">
          <div className="space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white dark:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;