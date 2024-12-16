import Hero from "@/components/Home/Hero";
import ShopCategories from "@/components/Home/ShopCategories";

export default async function Home() {
  // const response = await fetch('https://mnrn-shop-backend.onrender.com/api/v1')
  // const result = await response.json() || ''

  return (
    <div >
      <Hero />
      <ShopCategories />
      {"result.result"}
    </div>
  );
}
