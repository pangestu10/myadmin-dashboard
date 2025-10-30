import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, CurrencyDollarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const AnalyticsCard = ({ title, value, growth, isPositive = true, icon: Icon }) => {
  return (
    <div className="bg-primary rounded-xl shadow-lg p-6 border border-custom hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-tertiary mb-1">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
          {growth && (
            <div className={`flex items-center mt-2 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <ArrowTrendingUpIcon className="w-4 h-4 mr-1" /> : <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />}
              {growth}% dari bulan lalu
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;