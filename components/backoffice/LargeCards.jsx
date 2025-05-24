import React from 'react'
import LargeCard from './LargeCard'

 export default function LargeCards({sales}) {
    const totalSales = sales.reduce((acc,item)=>acc+item.total,0).toFixed(2) ?? 0;
    const orderStats = [
        {
            period:"Today Orders",
            sales:110000,
            color:"bg-green-600"
        },
        {
            period:"Yesterday Orders",
            sales:130000,
            color:"bg-blue-600"
        },
        {
            period:"This Month",
            sales:30000,
            color:"bg-orange-600"
        },
        {
            period:"All-time Sales",
            sales:totalSales,
            color:"bg-purple-600"
        }
    ]
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
        {
            orderStats.map((stat, index) => {
                return(
                    <LargeCard className="bg-green-600" data={stat} key={index}></LargeCard>
                )
            })
        }
    </div>
  )
}
