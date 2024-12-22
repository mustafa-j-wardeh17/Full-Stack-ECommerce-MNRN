import Hero from "@/components/Home/Hero";
import BestSells from "@/components/Home/OurBestSells";
import ShopCategories from "@/components/Home/ShopCategories";
import { Product } from "@/util/types";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const _digi_auth_token = (await cookieStore).get('_digi_auth_token');
  let isAdmin = false;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/is-admin`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.ok) {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  } catch (error) {
    isAdmin = false;
  }

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
        <BestSells
          isAdmin={isAdmin}
          type={'latest'}
          bestSells={result.result.products[0].latestProducts}
        />
        <BestSells
          isAdmin={isAdmin}
          bestSells={result.result.products[0].topRatedProducts}
        />

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
