import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function OverViewCard({sales,products}) {
    const productsCount = products.length.toString().padStart(2,"0");
    const salesCount = sales.length;
    const totalSales = sales.reduce((acc,item)=>acc +item.total,0);

  // Dummy sales revenue data
  const salesData = [
    {
      month: 'January 2025',
      revenue: 12000,
      orders: 150,
      growth: 5.2,
    },
    {
      month: 'February 2025',
      revenue: 15000,
      orders: 180,
      growth: 7.8,
    },
    {
      month: 'March 2025',
      revenue: 9000,
      orders: 120,
      growth: -2.3,
    },
    {
      month: 'April 2025',
      revenue: 18000,
      orders: 200,
      growth: 10.1,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
      {salesData && salesData.length > 0 ? (
        salesData.map((sale, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {sale.month}
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Revenue:</span> ${sale.revenue.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Orders:</span> {sale.orders}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Growth:</span>{' '}
              <span
                className={`${
                  sale.growth >= 0 ? 'text-green-600' : 'text-red-600'
                } font-semibold`}
              >
                {sale.growth >= 0 ? '+' : ''}{sale.growth}%
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No sales data available.
        </p>
      )}
    </div>
  );
}