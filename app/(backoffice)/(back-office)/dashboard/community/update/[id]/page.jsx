import NewTrainingForm from '@/components/backoffice/NewTrainingForm';
import { getData } from '@/lib/getData';
import React from 'react'

export default async function UpdateTraining({params:{id}}) {
    const categoriesData = await getData("categories");
      const categories = categoriesData.map((category)=>{
        return{
          id:category.id,
          title:category.title
        }
      }) 
      const trainingData = await getData(`trainings/${id}`);
    return (
      <NewTrainingForm categories={categories} updateData={trainingData}/>
    )
}
