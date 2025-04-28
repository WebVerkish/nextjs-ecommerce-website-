import FilterComponent from '@/components/frontend/Filter/FilterComponent'
import { getData } from '@/lib/getData';
import React from 'react'

export default async function Search({searchParams}) {
  
    const {search="",sort="asc",min=0,max="",page=1} = await searchParams;
    
    let products = await getData(`products?search=${search}&page=${page}&sort=${sort}&min=${min}&max=${max}`);
    const category = {
      title:search,
      slug:"",
      products,
      isSearch:true,
    }
    // const {products} = categories;
   return (
      <div>
         <FilterComponent category={category} products={products}/>
      </div>
    )
}
