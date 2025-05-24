import React from 'react'
import OverViewCard from './Farmer/OverViewCard'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData';
import { AlertCircle } from 'lucide-react';

export default async function FarmerDashboard() {
  const session = await getServerSession(authOptions);
    const user = session?.user;

    const {name ,email,id,role,emailVerified,status=false} = user;
    const sales = await getData("products");
    const salesById = sales.filter((sale)=>sale.vendorId === id);
    const products = await getData("products");
    const productsById = products.filter((product)=>product.userId === id);
    if(!status){
      return(<div className="alert alert-error flex items-center gap-2 max-w-md mx-auto rounded-lg p-4 border-2 border-red-500 bg-red-50 text-red-700 shadow-md">
      <AlertCircle className="h-6 w-6 text-red-500" />
      <span>Your account is under review. Please contact support for assistance.</span>
    </div>)
    }else{
      return (<OverViewCard sales={salesById} products={productsById}/>)
    }
}
