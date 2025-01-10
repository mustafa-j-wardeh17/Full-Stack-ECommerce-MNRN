import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let shopItems: string[] = []
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/sitemap`)
        if(response.ok){
            const result = await response.json()
            shopItems = result.result.productsIds
        }
        
    } catch (error:any) {
        console.log(error.message)
    }




    const urlShopEntries: MetadataRoute.Sitemap = shopItems.map((productId) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/${productId}`,
    }));

    // Concatenate fixed URLs first, followed by the dynamically generated ones
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,

        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us`,

        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,

        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
        },
        ...urlShopEntries // Shop entries appended last
    ];
}
