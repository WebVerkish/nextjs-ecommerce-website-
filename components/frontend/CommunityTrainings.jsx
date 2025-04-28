import React from 'react'
import TrainingCarousel from './TrainingCarousel'
import Link from 'next/link'
import { getData } from '@/lib/getData'

export default async function CommunityTrainings() {
  const trainings = await getData("trainings");
  return (
    <div className=" bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 text-slate-800 overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-900 py-3 px-6 font-semibold text-slate-800 dark:text-slate-100 flex justify-between items-center">
          <h2>Ecom Community</h2>
          <Link href="#" className='bg-lime-600 hover:bg-lime-700 duration-300 transition-all text-slate-50 rounded-md px-4 py-2'>See All</Link>
        </div>
        <div className="bg-white dark:bg-slate-700 p-4">
          <TrainingCarousel trainings={trainings} />
        </div>
    </div>
  )
}
