import { InfiniteMovingCardsDemo } from "@/components/Home/BrandsInfiniteMoving";
import Hero from "@/components/Home/Hero";
import BestSells from "@/components/Home/OurBestSells";
import ShopCategories from "@/components/Home/ShopCategories";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Contact from "@/components/shared/Contact";
import { Separator } from "@/components/ui/separator";
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products?homepage=true`, {
      cache: 'force-cache'
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const result: ResultInterface = await response.json() || ''

    return (
      <div >
        <Hero />
        <ShopCategories />
        <Separator />
        <InfiniteMovingCardsDemo />
        <Separator />
        <WhyChooseUs />
        <Separator />
        {/* bg for latest must graidiant */}
        <BestSells
          type={'latest'}
          bestSells={result.result.products[0].latestProducts}
        />
        <Separator />
        {/* bg for best must graidiant */}
        <BestSells
          bestSells={result.result.products[0].topRatedProducts}
        />

        <Separator />
        <Contact />
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }

}
