import React from 'react';
import { useTranslations } from 'next-intl';

const Pricelist = () => {
  const t = useTranslations('Pricelist');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for products */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <img src="/placeholder-product.jpg" alt="Product" className="w-full h-48 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">Product Name</h3>
          <p className="text-gray-600 dark:text-gray-400">Product description</p>
          <p className="text-xl font-bold mt-2">$99.99</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricelist;
