import { getWixClient } from "../wix.base";
import { cache } from "react";
import { WixClient } from "@wix/sdk";

export const getCollection = cache(async (wixClient:any, slug:string) => {
  if (!slug) {
    return null;
  }

  const { collection } = await wixClient.collections.getCollectionBySlug(slug);
  return collection;
});

interface GetCollectionProductsParams {
  q?: string;
  collectionIds?: string | string[];
  price_min?: number;
  price_max?: number;
  sort?: "price_asc" | "price_desc" | "last_updated";
  skip?: number;
  limit?: number;
}

export const getCollectionProducts = cache(async (
  wixClient:any,
  {
    q,
    collectionIds,
    price_min,
    price_max,
    sort = "last_updated",
    skip, // the products to skip
    limit, //the number of products to return
  }: GetCollectionProductsParams,
) => {
  let query = await wixClient.products.queryProducts();

  if (q) {
    query = query.startsWith("name", q);
  }
  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds]
    : [];

  if (collectionIdsArray.length > 0) {
    query = query.hasSome("collectionIds", collectionIdsArray);
  }
  switch (sort) {
    case "price_asc":
      query = query.ascending("price");
      break;
    case "price_desc":
      query = query.descending("price");
      break;
    case "last_updated":
      query = query.descending("lastUpdated");
      break;
  }
  if(price_min){
    query = query.ge("priceData.price", price_min);
  }
  if(price_max){
    query = query.le("priceData.price", price_max);
  }
  if (limit) query = query.limit(limit);

  if (skip) query = query.skip(skip);

  return query.find();
});

export async function getAllCollections(wixClient:any) {
  const collections = await wixClient.collections
    .queryCollections()
    .ne("_id", "00000000-000000-000000-000000000001") //All products
    .ne("_id", "fe463582-697d-66f5-302a-4cc82d70c0cd") //featured products
    .find();

  return collections?.items || null;
}
