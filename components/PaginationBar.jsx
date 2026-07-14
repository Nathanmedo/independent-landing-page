"use client";

import React, { Suspense } from "react";
import {
  Pagination,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationItem,
  PaginationContent,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";



const PaginationBar = ({ currentPage, totalPages }) => {
  return(
    <Suspense fallback={<PaginationBarLoadingSkeleton />}>
      <PaginationNumber currentPage={currentPage} totalPages={totalPages} />
    </Suspense>
  )
};

const PaginationNumber = ({ currentPage, totalPages }) => {
  const searchParams = useSearchParams();

  function getPageLink(page) {
    //create a copy of the search params
    const newSearchParams = new URLSearchParams(searchParams);
    //set the page parameter
    newSearchParams.set("page", page.toString());

    return `?${newSearchParams.toString()}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPageLink(currentPage - 1)}
            className={cn('pointer-events-auto',
              currentPage === 1 && "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          //get the first and last page
          const isEdgePage = page === 1 || page >= totalPages;
          //get the pages close to the current page
          const isNearCurrentPage = Math.abs(page - currentPage) <= 2;

          if (!isEdgePage && !isNearCurrentPage) {
            //check if it is page 2 or page before the last.
            if (i === 1 || i === totalPages - 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }

            return null;
          }
          return (
            <PaginationItem
              key={page}
              className={cn(
                "hidden md:block pointer-events-auto",
                page === currentPage && "pointer-events-none block",
              )}
            >
              <PaginationLink
                href={getPageLink(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={getPageLink(currentPage + 1)}
            className={cn('pointer-events-auto',
              currentPage === totalPages &&
                "text-muted-foreground pointer-events-none",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};


const PaginationBarLoadingSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-sm bg-gray-400" />
      <Skeleton className="h-8 w-4 rounded-sm bg-gray-400" />
      <Skeleton className="h-8 w-4 rounded-sm bg-gray-400" />
      <Skeleton className="h-8 w-8 rounded-sm bg-gray-400" />
    </div>
  );
};

export default PaginationBar;
