"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CollectionToolbarProps {
  totalProducts: number;
  collectionName: string;
}

export default function CollectionToolbar({
  totalProducts,
  collectionName,
}: CollectionToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("search") ?? ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 350);

    return () => clearTimeout(timeout);
  }, [value]);

  console.log(collectionName)

  return (
    <section className="mx-auto mb-24 max-w-7xl px-6">

      <div className="flex flex-col gap-8 border-y border-white/80 py-8 md:flex-row md:items-center md:justify-between">

        <div className="flex flex-1 items-center gap-4">

          <Search
            size={18}
            className="text-neutral-200"
          />

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Search ${collectionName.toLowerCase()}...`}
            className="
              w-full
              bg-transparent

              text-lg
              text-white

              placeholder:text-neutral-500

              outline-none
            "
          />

          {value && (
            <button
              onClick={() => setValue("")}
              className="text-neutral-200 transition hover:text-white"
            >
              <X size={18} />
            </button>
          )}

        </div>

        <span className="text-sm uppercase tracking-[0.35em] text-neutral-200">
          {totalProducts} Products
        </span>

      </div>

    </section>
  );
}