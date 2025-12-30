import { Metadata } from "next";

import Container from "@/common/components/elements/Container";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `Nelsen Store | Dashboard`,
  alternates: {
    canonical: `${process.env.DOMAIN}`,
  },
};

const HomePage = () => {
  return (
    <Container data-aos="fade-up">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Nelsen Store
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Your comprehensive store management platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300">Monitor your store performance</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Transaksi</h3>
            <p className="text-gray-600 dark:text-gray-300">Manage transactions</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Chat Room</h3>
            <p className="text-gray-600 dark:text-gray-300">Communicate with customers</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Pricelist</h3>
            <p className="text-gray-600 dark:text-gray-300">View product pricing</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
