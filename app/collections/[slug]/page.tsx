import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/productCard";
import { getCollectionProducts } from "@/lib/wix-api/collections";
import { getWixClient } from "@/lib/wix.base";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollection } from "@/lib/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-api/wix.server";
import PaginationBar from "@/components/PaginationBar";
import { notFound } from "next/navigation";
import CollectionHero from "@/components/collection-page/CollectionHero";
import CollectionToolbar from "@/components/collection-page/CollectionToolbar";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

interface MetadataProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;

  const wixClient = getWixClient();

  const collection = await getCollection(wixClient, slug);

  if (!collection) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: `${collection.name} | Independent Chemicals NIG. ENT.`,
    description:
      collection.description ??
      `Browse our premium ${collection.name} collection. Trusted printing materials and supplies from Independent Chemicals.NIG.`,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;

  const { page = "1", search = "" } = await searchParams;

  const wixClient = getWixClient();

  // Get the collection
  const collection = await getCollection(wixClient, slug);

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Collection Not Found</h1>

        <p className="mb-8">The collection you're looking for doesn't exist.</p>

        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  const pageItemsNumber = 12;
  const collectionProducts = await getCollectionProducts(
    await getWixServerClient(),
    {
      q: search,
      collectionIds: collection._id,
      limit: pageItemsNumber,
      skip: (Number(page) - 1) * pageItemsNumber,
    },
  );

  const collectionName = collection?.name?.split("-")[0];

  if (page > (collectionProducts?.totalPages || 1)) notFound();

  if (collectionProducts._items.length === 0) {
    return (
      <section className="bg-primary/95">
        <CollectionHero collection={collection} />

        <CollectionToolbar totalProducts={0} collectionName={collectionName} />

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pb-32 pt-10 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white">
            No products found.
          </h2>

          <p className="mt-6 max-w-lg text-lg text-neutral-400">
            We couldn't find any products matching your {search}. Try another
            keyword.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary/95">
      <CollectionHero collection={collection} />

      <CollectionToolbar
        totalProducts={collectionProducts.totalCount ?? 0}
        collectionName={collectionName}
      />

      <div className="container mx-auto px-4 pt-2 pb-16">
        <Suspense
          key={`${page}-${collection._id}`}
          fallback={
            <ProductLoadingGrid length={collection?.numberOfProducts} />
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {collectionProducts._items.map((product: any, index: number) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="col-span-3 mt-4 w-full">
            <PaginationBar
              currentPage={parseInt(page)}
              totalPages={collectionProducts.totalPages || 1}
            />
          </div>
        </Suspense>
      </div>
    </section>
  );
}

function ProductLoadingGrid({ length = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="space-y-4">
          <Skeleton className="w-full h-40 rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
