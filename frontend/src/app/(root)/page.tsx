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

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products?homepage=true`)
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const result: ResultInterface = await response.json() || ''

    return (
      <div >
        <Hero />
        <ShopCategories />
        <BestSells type={'latest'} bestSells={result.result.products[0].latestProducts} />
        <BestSells bestSells={result.result.products[0].topRatedProducts} />

      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="text-center text-red-500">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

}
