import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const FeaturedSections = () => {
  const t = useTranslations('DashboardPage');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link href="/transaksi" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold mb-2">Transaksi</h3>
        <p className="text-gray-600 dark:text-gray-400">Riwayat pembelian Anda</p>
      </Link>
      <Link href="/chat" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold mb-2">Chat Room</h3>
        <p className="text-gray-600 dark:text-gray-400">Obrolan dengan pengguna lain</p>
      </Link>
      <Link href="/pricelist" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold mb-2">Pricelist</h3>
        <p className="text-gray-600 dark:text-gray-400">Daftar harga produk</p>
      </Link>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Testimoni</h3>
        <p className="text-gray-600 dark:text-gray-400">Ulasan dari pelanggan</p>
      </div>
    </div>
  );
};

export default FeaturedSections;
