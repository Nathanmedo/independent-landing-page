"use client";

import React, { useState } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { findVariant, ProductPrice } from "@/lib/utils";
import { products } from "@wix/stores";
import { IconSandbox } from "@tabler/icons-react";
import ProductMedia from "./ProductMedia";
import { DialogOption } from "@/components/ui/dialogOption";
import ProductOptions from "./ProductOptions";

export default function ProductDetails({ productInfo }: any) {
  const [product, setProduct] = useState(null) as any;
  const [quantity, setQuantity] = useState(0);

  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useState(
    productInfo.productOptions
      .map((option: any) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {}) || {},
  );

  const variant = findVariant(productInfo, selectedOptions);
  const inStock = checkInStock(productInfo, selectedOptions);

  const avaliableQuantity =
    variant?.stock?.quantity ?? product?.stock?.quantity;

  const avaliableQuantityExceeded =
    !!avaliableQuantity && quantity > avaliableQuantity;

  const selectedOptionMedia = productInfo.productOptions.flatMap(
    (option: any) => {
      const selectedOption = option.choices?.find(
        (choice: any) =>
          selectedOptions[option.name || ""] === choice?.description,
      );
      return selectedOption?.media?.items ?? [];
    },
  );

  const productImage = productInfo?.media?.mainMedia?.image;
  console.log("description",productInfo.description)

  return (
    <div className="bg-primary/95 min-h-screen pb-6">
      <div className="mx-auto  max-w-7xl px-4 pt-20 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
        <div className="mb-10">
          <button
            onClick={() => router.back()}
            className="group inline-flex cursor-pointer items-center gap-3 text-sm tracking-[0.2em] uppercase text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

            <span>Back</span>
          </button>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Image gallery */}
          <div className="top-14">
            <div className="w-full">
              <ProductMedia
                media={
                  !!selectedOptionMedia?.length
                    ? selectedOptionMedia
                    : productInfo?.media?.items
                }
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 text-white sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight">
              {productInfo?.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only ">Product information</h2>
              <ProductPrice product={productInfo} selectedVariant={variant} />
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only ">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        rating < 4 ? "text-yellow-400" : "text-gray-300"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">4 out of 5 stars</p>
                <a
                  href="#"
                  className="ml-3 text-md font-medium text-neutral-300 hover:text-indigo-500"
                >
                  117 reviews
                </a>
              </div>
            </div>
            <div>
              {inStock ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>

            {/* This is the product details */}
            <ProductOptions
              productInfo={productInfo}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              checkInStock={checkInStock}
            />

            {/* !TODO: something is meant to be here */}
            {/* <DialogOption
              image={productImage}
              product={productInfo}
              selectedOptions={selectedOptions}
            /> */}

            {!!avaliableQuantity &&
              (avaliableQuantityExceeded ?? avaliableQuantity < 10) && (
                <div className="mt-3 flex items-center bg-red-300 px-4 py-1 text-sm text-red-500">
                  <IconSandbox className="text-[20px]" />{" "}
                  <span>Only {avaliableQuantity} Items left!</span>
                </div>
              )}
            <Tabs defaultValue="description" className="mt-10">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="mt-4 text-sm text-neutral-200"
              >
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  {productInfo?.description ? <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: productInfo?.description,
                    }}
                  /> : <div>Further description of the product will be displayed here.</div>}
                </div>
              </TabsContent>
              <TabsContent value="details" className="mt-4 text-neutral-200">
                <div className="space-y-2 text-sm">
                  {productInfo?.additionalInfoSections.length !==0 ? (productInfo?.additionalInfoSections.map(
                    (eachSection: any, i: number) => (
                      <div key={i}>
                        <h1 className="">{eachSection.title}</h1>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: eachSection.description,
                          }}
                        />
                      </div>
                    ),
                  )): <div>Further details of the product will be displayed here.</div>}
                </div>
              </TabsContent>
              <TabsContent
                value="shipping"
                className="mt-4 text-sm text-neutral-200"
              >
                <p>
                  Express shipping is available for an additional fee. Most
                  orders are processed and shipped within 1-2 business days.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function checkInStock(product: any, selectedOptions: any) {
  const variant = findVariant(product, selectedOptions);

  return variant
    ? variant?.stock?.inStock && variant?.stock?.quantity !== 0
    : product?.stock?.inventoryStatus === products?.InventoryStatus?.IN_STOCK ||
        product?.stock?.inventoryStatus ===
          products?.InventoryStatus?.PARTIALLY_OUT_OF_STOCK;
}
