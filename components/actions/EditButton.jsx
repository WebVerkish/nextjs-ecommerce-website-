import { Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function EditButton({editEndpoint,title}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log(baseUrl)
  return (
    <Link href={`${baseUrl}/dashboard/${editEndpoint}`} className='flex items-center text-lime-600'>
        <Pencil className='mr-2 w-4 h-4'/>
        <span>Edit {title}</span>
    </Link>
  )
}
