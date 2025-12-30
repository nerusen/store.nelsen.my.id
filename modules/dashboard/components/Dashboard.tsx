"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import Breakline from "@/common/components/elements/Breakline";
import Button from "@/common/components/elements/Button";
import Card from "@/common/components/elements/Card";
import Container from "@/common/components/elements/Container";

interface Transaction {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  status: string;
  createdAt: string;
}

interface UserStats {
  totalTransactions: number;
  totalSpent: number;
  pendingTransactions: number;
  completedTransactions: number;
}

const Dashboard = () => {
  const t = useTranslations('DashboardPage');
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalTransactions: 0,
    totalSpent: 0,
    pendingTransactions: 0,
    completedTransactions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API calls
      // const transactionsResponse = await fetch('/api/transactions/user');
      // const statsResponse = await fetch('/api/user/stats');

      // Mock data for now
      setTransactions([
        {
          id: "1",
          productName: "Sample Product",
          productImage: "/images/product1.jpg",
          price: 100000,
          status: "completed",
          createdAt: new Date().toISOString()
        }
      ]);

      setStats({
        totalTransactions: 5,
        totalSpent: 500000,
        pendingTransactions: 1,
        completedTransactions: 4
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "process":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "process":
        return "Diproses";
      case "completed":
        return "Selesai";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* User Profile Section */}
      <Card className="p-6 mb-8">
        <div className="flex items-center space-x-4">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-600">
                {session?.user?.name?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {session?.user?.name || "User"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </Card>

      {/* Featured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary-500 mb-2">
            {stats.totalTransactions}
          </div>
          <p className="text-gray-600 dark:text-gray-400">Total Transaksi</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-500 mb-2">
            Rp {stats.totalSpent.toLocaleString('id-ID')}
          </div>
          <p className="text-gray-600 dark:text-gray-400">Total Pengeluaran</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-yellow-500 mb-2">
            {stats.pendingTransactions}
          </div>
          <p className="text-gray-600 dark:text-gray-400">Pending</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {stats.completedTransactions}
          </div>
          <p className="text-gray-600 dark:text-gray-400">Selesai</p>
        </Card>
      </div>

      {/* Contact Section */}
      <Card className="p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Hubungi Kami
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button
            className="flex items-center space-x-2"
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          >
            <span>📱</span>
            <span>WhatsApp</span>
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => window.open('https://instagram.com/username', '_blank')}
          >
            <span>📸</span>
            <span>Instagram</span>
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => window.location.href = 'mailto:contact@example.com'}
          >
            <span>✉️</span>
            <span>Email</span>
          </Button>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Riwayat Pembelian Terbaru
        </h3>
        {transactions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            Belum ada transaksi
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={transaction.productImage}
                    alt={transaction.productName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {transaction.productName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rp {transaction.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                    {getStatusText(transaction.status)}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(transaction.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Dashboard;
