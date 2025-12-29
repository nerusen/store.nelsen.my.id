import React from 'react';
import { useTranslations } from 'next-intl';

const StatsOverview = () => {
  const t = useTranslations('DashboardPage');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-blue-500">150</h3>
        <p className="text-gray-600 dark:text-gray-400">Total Transaksi</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-green-500">25</h3>
        <p className="text-gray-600 dark:text-gray-400">Total User</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-purple-500">45</h3>
        <p className="text-gray-600 dark:text-gray-400">Total Testimoni</p>
      </div>
    </div>
  );
};

export default StatsOverview;
