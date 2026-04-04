import { MetadataRoute } from "next";

/** Build-time sitemap generation was timing out when the API was slow or unreachable. */
export const dynamic = "force-dynamic";

const staticEntries = (baseUrl: string): MetadataRoute.Sitemap => [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/about-us` },
    { url: `${baseUrl}/contact` },
    { url: `${baseUrl}/sign-in` },
    { url: `${baseUrl}/sign-up` },
    { url: `${baseUrl}/forgot-password` },
    { url: `${baseUrl}/shop` },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    let shopItems: string[] = [];
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/sitemap`,
            {
                next: { revalidate: 3600 },
                signal: AbortSignal.timeout(15_000),
            }
        );
        if (response.ok) {
            const result = await response.json();
            shopItems = result.result?.productsIds ?? [];
        }
    } catch (error: unknown) {
        console.error(
            "sitemap: product IDs fetch failed, using static URLs only",
            error instanceof Error ? error.message : error
        );
        return staticEntries(baseUrl);
    }




    const urlShopEntries: MetadataRoute.Sitemap = shopItems.map((productId) => ({
        url: `${baseUrl}/shop/${productId}`,
    }));

    return [...staticEntries(baseUrl), ...urlShopEntries];
}
