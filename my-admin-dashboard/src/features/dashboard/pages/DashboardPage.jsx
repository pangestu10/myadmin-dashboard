import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api/services';
import AnalyticsCard from '@/components/AnalyticsCard';
import UserGrowthChart from '@/components/UserGrowthChart';
import RevenueChart from '@/components/RevenueChart';
import TrafficSourceChart from '@/components/TrafficSourceChart';
import { UserGroupIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await apiClient.get('/analytics');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-secondary">Loading Analytics...</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center h-64 text-secondary">Could not load analytics data.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard title="Total Users" value={data.totalUsers.toLocaleString()} growth={data.growth} icon={UserGroupIcon} />
        <AnalyticsCard title="Total Revenue" value={`$${data.totalRevenue.toLocaleString()}`} growth={data.growth} icon={CurrencyDollarIcon} />
        <AnalyticsCard title="Growth Rate" value={`${data.growth}%`} isPositive={data.growth > 0} icon={ChartBarIcon} />
        <AnalyticsCard title="Bounce Rate" value="32%" isPositive={false} icon={ChartBarIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-primary p-6 rounded-xl shadow-lg border border-custom">
          <h2 className="text-lg font-semibold text-primary mb-4">User Growth</h2>
          <UserGrowthChart data={data.userGrowthData} />
        </div>
        <div className="bg-primary p-6 rounded-xl shadow-lg border border-custom">
          <h2 className="text-lg font-semibold text-primary mb-4">Revenue by Product</h2>
          <RevenueChart data={data.revenueData} />
        </div>
        <div className="bg-primary p-6 rounded-xl shadow-lg border border-custom">
          <h2 className="text-lg font-semibold text-primary mb-4">Traffic Sources</h2>
          <TrafficSourceChart data={data.trafficSource} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;