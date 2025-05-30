import CategoryList from "@/components/frontend/CategoryList";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const categories = await getData("categories");
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const trainings = await getData("trainings");
  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.map((category, index) => (
          <div className="py-8" key={index}>
            <CategoryList category={category} />
          </div>
        ))
      ) : (
        <div className="text-center py-8">No categories available.</div>
      )}
      {Array.isArray(trainings) && (
        <div className="py-8">
          <CommunityTrainings
            title="Featured Trainings"
            trainings={trainings.slice(0, 3)}
          />
        </div>
      )}
      {/* <h2 className="text-4xl">Welcome to Ecommerce Site</h2>
      <Link className="my-4 underline" href="/register-farmer">Become a farmer / Vendor / Supplier</Link> */}
    </div>
  );
}
