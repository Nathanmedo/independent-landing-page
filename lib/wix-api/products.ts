import { cache } from "react";


export const  getProductBySlug = cache(async(wixClient:any, slug:string) => {
  if (!slug) {
    return null;
  }

  console.log("here 1", slug);

  console.log(wixClient);

  //it will return an array.
  let { items } = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .limit(1)
    .find();
  console.log(items);
  console.log("here 2");

  if (items.length === 0) {
    throw new Error("No product found with the given slug");
  }

  const product = items[0];

  if (!product || !product.visible) {
    return null;
  }

  return product;
})
