import { MetadataRoute } from "next";

import { getWixClient } from "@/lib/wix.base";
import { getAllCollections } from "@/lib/wix-api/collections";
import { getCollectionProducts } from "@/lib/wix-api/collections";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const wixClient = getWixClient();
const collections = await getAllCollections(wixClient);

const productResults = await Promise.all(
  collections.map((collection:any) =>
    getCollectionProducts(wixClient, {
      collectionIds: collection._id!,
    })
  )
);

  const baseUrl = "https://independentchemnig.com";

  const collectionUrls =
    collections?.map((collection:any) => ({
      url: `${baseUrl}/collections/${collection.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) ?? [];

  const productUrls =
    productResults?.map((product) => ({
      url: `${baseUrl}/product-page/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...collectionUrls,

    ...productUrls,
  ];
}