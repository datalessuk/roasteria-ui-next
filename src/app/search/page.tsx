"use client";

import SearchCoffeeCard from "@/components/features/cards/SearchCoffeeCard";
import SearchComponent from "@/components/features/search/SearchComponent";
import { Button } from "@/components/ui/button";
import { useGetSearch } from "@/hooks/searchhooks/useGetSearch";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loading from "@/app/search/loading";

export default function Search() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      tasting_notes: searchParams.getAll("flavour") || undefined,
      name: searchParams.get("name") || undefined,
      processing_method: searchParams.get("proccessing") || undefined,
      roast: searchParams.get("roast") || undefined,
      origin: searchParams.get("origin") || undefined,
    }),
    [searchParams]
  );
  const { coffees, loading, error, total, totalPages } = useGetSearch(
    filters,
    page,
    limit
  );
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          <div className="rounded-lg border border-border text-card-foreground dark:shadow-md dark:shadow-black/20 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <SearchComponent />
          </div>
          <div className="flex rounded-lg border border-border flex-col gap-3 p-6 pb-2 dark:shadow-md dark:shadow-black/20 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <div>
              <h1 className="text-xl">Search Results</h1>
              <h2 className="text-xs">Found {total} results</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {loading ? (
                <div className="col-span-full">
                  <Loading />
                </div>
              ) : (
                coffees.map((coffee) => (
                  <SearchCoffeeCard key={coffee.id} coffee={coffee} />
                ))
              )}
            </div>
            <div className="pt-5 pb-2">
              <div className="pt-5 pb-5 text-center">
                <h1 className="">Don&apos;t see a coffee ?</h1>
                <Button variant={"custom"}>
                  <a href="/addCoffee"> Add it to the collection </a>
                </Button>
              </div>
            </div>
            <div className="border-t-1 dark:border-gray-700">
              <div className="pt-3">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={
                          page <= 1 ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(i + 1);
                          }}
                          isActive={page === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                        className={
                          page >= totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
