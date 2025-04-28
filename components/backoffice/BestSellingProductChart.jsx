"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function BestSellingProductChart() {
    const data = {
        labels: ['Cabbage', 'Watermelon', 'Lime', 'Broccoli', 'Maize'],
        datasets: [
            {
            label: '# of Votes',
            data: [50, 10, 20, 10, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            },
        ],
    };
  return (
    <div className='dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl'>
        <h2 className='text-xl font-bold mb-4 text-slate-800 dark:text-slate-50'>Best Selling Products</h2>
        {/* {chart} */}
        <div className="p-4">
            <Pie data={data}  />
        </div>
    </div>
  )
}
