import NewProductForm from '@/components/backoffice/NewProductForm';
import { getData } from '@/lib/getData';
import React from 'react'

export default async function UpdateProduct({params:{id}}) {
  const categoriesData = await getData("categories");
    const usersData = await getData("users");
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
    const product = await getData(`products/${id}`);
    return (
      <NewProductForm categories={categories} farmers={farmers} updateData={product}/>
    )
}
