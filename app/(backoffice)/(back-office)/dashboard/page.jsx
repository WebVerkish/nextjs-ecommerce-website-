import CustomDataTable from '@/components/backoffice/CustomDataTable'
import DashboardCharts from '@/components/backoffice/DashboardCharts'
import FarmerDashboard from '@/components/backoffice/FarmerDashboard'
import Heading from '@/components/backoffice/Heading'
import LargeCards from '@/components/backoffice/LargeCards'
import SmallCards from '@/components/backoffice/SmallCards'
import UserDashboard from '@/components/backoffice/UserDashboard'
import { authOptions } from '@/lib/authOptions'
import { getData } from '@/lib/getData'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const sales = await getData("sales");
  const orders = await getData("orders");
  const products = await getData("products");
  if(role === "FARMER"){
    return <FarmerDashboard/>
  }
  if(role === "USER"){
    return <UserDashboard/>
  }
  return (
    <div>
      <Heading title="Dashboard Overview"></Heading>
      {/* {large Cards} */}
      <LargeCards sales={sales}/>
      {/* {Small cards} */}
      <SmallCards orders={orders}/>
      {/* {charts} */}
      <DashboardCharts sales={sales}/>
      {/* {Recent orders Table} */}
      <CustomDataTable/>
    </div>
  )
}