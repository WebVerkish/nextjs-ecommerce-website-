// import NewMarketForm from '@/components/backoffice/NewMarketForm';
import NewMarketForm from "@/components/backoffice/NewMarketForm";
import { getData } from "@/lib/getData";

export default async function NewMarket() {
  const categoriesData = await getData("categories");
  const categories = Array.isArray(categoriesData)
    ? categoriesData
        .filter((category) => category && category.id && category.title)
        .map((category) => ({
          id: category.id,
          title: category.title,
        }))
    : [];
  console.log("Categories for NewMarket:", categories); // Debug log

  return <NewMarketForm categories={categories} />;
}
