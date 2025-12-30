import React from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import Breakline from "@/common/components/elements/Breakline";
import UserProfile from "./UserProfile";
import FeaturedSections from "./FeaturedSections";
import TransactionChart from "./TransactionChart";
import StatsOverview from "./StatsOverview";

const Dashboard = () => {
  const t = useTranslations('DashboardPage');
  const { data: session } = useSession();

  return (
    <>
      <UserProfile />
      <Breakline className="my-8" />
      <FeaturedSections />
      <Breakline className="my-8" />
      <TransactionChart />
      <Breakline className="my-8" />
      <StatsOverview />
    </>
  );
};

export default Dashboard;
