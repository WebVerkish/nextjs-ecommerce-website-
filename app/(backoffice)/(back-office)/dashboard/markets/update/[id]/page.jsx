import NewMarketForm from '@/components/backoffice/NewMarketForm';
import { getData } from '@/lib/getData';
import React from 'react'

export default async function UpdateMarket({params:{id}}) {
 const categoriesData = await getData("categories");
   const categories = categoriesData.map((category)=>{
     return{
       id:category.id,
       title:category.title
     }
   }) 
   const market = await getData(`markets/${id}`)
   return (
     <NewMarketForm categories={categories} updateData={market}/>
   )
}
