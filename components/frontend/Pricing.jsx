'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Free',
    price: 0,
    priceLabel: 'Free',
    description: 'Basic plan for startups',
    features: [
      { name: '1 team member', available: true },
      { name: '5GB Cloud storage', available: true },
      { name: 'Integration help', available: false },
      { name: 'Sketch Files', available: false },
      { name: 'API Access', available: false },
      { name: 'Complete documentation', available: false },
      { name: '24×7 phone & email support', available: false },
    ],
  },
  {
    name: 'Silver',
    price: 49,
    priceLabel: '$49/month',
    description: 'Standard plan for growing teams',
    features: [
      { name: '2 team members', available: true },
      { name: '20GB Cloud storage', available: true },
      { name: 'Integration help', available: true },
      { name: 'Sketch Files', available: false },
      { name: 'API Access', available: false },
      { name: 'Complete documentation', available: false },
      { name: '24×7 phone & email support', available: false },
    ],
  },
  {
    name: 'Platinum',
    price: 99,
    priceLabel: '$99/month',
    description: 'Premium plan for enterprises',
    features: [
      { name: '5 team members', available: true },
      { name: '100GB Cloud storage', available: true },
      { name: 'Integration help', available: true },
      { name: 'Sketch Files', available: true },
      { name: 'API Access', available: true },
      { name: 'Complete documentation', available: true },
      { name: '24×7 phone & email support', available: true },
    ],
  },
];

export default function Pricing() {
  const router = useRouter();

  const handleChoosePlan = (planName) => {
    // Set search params
    const searchParams = new URLSearchParams();
    searchParams.set('plan', planName.toLowerCase());
    // Redirect to /register with search params
    router.push(`/register-farmer?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Choose Your Plan
      </h2>
      <div className="flex items-center justify-center gap-6 w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              {plan.name} Plan
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              {plan.price === 0 ? (
                <span className="text-5xl font-extrabold tracking-tight">
                  Free
                </span>
              ) : (
                <>
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {plan.description}
            </p>
            <ul role="list" className="space-y-5 my-7">
              {plan.features.map((feature) => (
                <li
                  key={feature.name}
                  className={`flex ${!feature.available ? 'line-through decoration-gray-500' : ''}`}
                >
                  <svg
                    className={`shrink-0 w-4 h-4 ${
                      feature.available
                        ? 'text-blue-700 dark:text-blue-500'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => handleChoosePlan(plan.name)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}