import React from 'react';
import { useTranslations } from 'next-intl';

const Transaksi = () => {
  const t = useTranslations('Transaksi');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Riwayat Transaksi</h2>
        <div className="space-y-4">
          {/* Placeholder for transactions */}
          <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Transaksi #001</h3>
                <p className="text-gray-600 dark:text-gray-400">Status: Pending</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$99.99</p>
                <p className="text-sm text-gray-500">2023-10-01</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
