import React from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

const UserProfile = () => {
  const { data: session } = useSession();
  const t = useTranslations('DashboardPage');

  if (!session) {
    return <div>Please login to view your profile.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={session.user?.image || '/default-avatar.png'}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{session.user?.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{session.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
