import Hero from "@/components/Home/Hero";
import BestSellers from "@/components/Home/OurBestSeller";
import ShopCategories from "@/components/Home/ShopCategories";

interface ResultInterface {
  result: {
    products: any[]
  }
}
export default async function Home() {
  const response = await fetch('https://mnrn-shop-backend.onrender.com/api/v1/products')
  const result: ResultInterface = await response.json() || ''
  const products: any[] = result.result.products

  return (
    <div >
      <Hero />
      <ShopCategories />
      <BestSellers />
      {
        products.map((item: any, idx: number) => (
          <p key={idx}>
            {item._id}
          </p>
        ))
      }
    </div>
  );
}
