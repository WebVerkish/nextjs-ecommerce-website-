import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
    const session = await getServerSession(authOptions);
    if(!session){
        return;
    }
    const {name} = session?.user || {};
  return (
    <div>
        <h2>Welcome {name}</h2>
    </div>
  )
}
