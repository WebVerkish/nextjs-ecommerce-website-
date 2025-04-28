import { Layers } from 'lucide-react'
import React from 'react'

export default function LargeCard({data}) {
  return (
    <div className={`rounded-lg text-white shadow0md p-8 flex items-center flex-col gap-2 ${data.color}`}>
        <Layers></Layers>
        <h4>{data.period}</h4>
        <h2 className='lg:text-3xl text-2xl'>UGX.${data.sales}k</h2>
    </div>
  )
}
