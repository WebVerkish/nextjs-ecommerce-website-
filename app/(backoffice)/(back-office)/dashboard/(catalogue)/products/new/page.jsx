import NewProductForm from '@/components/backoffice/NewProductForm'
import { getData } from '@/lib/getData';
import React from 'react'

export default async function NewProduct() {
  // categories and farmers
  const categoriesData = await getData("categories");
  const usersData = await getData("users");

  if(!categoriesData || !usersData) {
    return <div>Loading...</div>
  }
  const farmersData = usersData.filter((user)=>user.role === "FARMER");
  const farmers = farmersData.map((farmer)=>{
    return {
      id:farmer.id,
      title:farmer.name,
    }
  })
  const categories = categoriesData.map((category)=>{
    return{
      id:category.id,
      title:category.title
    }
  }) 
  return (
    <NewProductForm categories={categories} farmers={farmers} />
  )
}
