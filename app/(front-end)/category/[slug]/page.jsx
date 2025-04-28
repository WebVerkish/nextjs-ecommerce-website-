
import FilterComponent from '@/components/frontend/Filter/FilterComponent'
import { getData } from '@/lib/getData'
import React from 'react'

export default async function page({params: {slug},searchParams}) {
  
  const {sort="asc",min=0,max="",page=1} = await searchParams;
  
  const category = await getData(`categories/filter/${slug}`);
  let products = await getData(`products?catId=${category.id}&page=${page}&sort=${sort}&min=${min}&max=${max}`);
  // const {products} = categories;
  return (
    <div>
       <FilterComponent category={category} products={products}/>
    </div>
  )
}
