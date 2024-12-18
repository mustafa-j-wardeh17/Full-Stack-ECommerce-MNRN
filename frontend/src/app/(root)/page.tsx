import Hero from "@/components/Home/Hero";
import BestSells from "@/components/Home/OurBestSells";
import ShopCategories from "@/components/Home/ShopCategories";
import { Product } from "@/util/types";

interface ResultInterface {
  result: {
    products: [
      {
        latestProducts: Product[],
        topRatedProducts: Product[]
      }
    ]
  }
}
export default async function Home() {
  const response = await fetch('https://mnrn-shop-backend.onrender.com/api/v1/products?homepage=true')
  const result: ResultInterface = await response.json() || ''

  return (
    <div >
      <Hero />
      <ShopCategories />
      <BestSells type={'latest'} bestSells={result.result.products[0].latestProducts} />
      <BestSells bestSells={result.result.products[0].topRatedProducts} />

    </div>
  );
}
