import { Button } from "@/components/ui/button";

export default function Search() {
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
          <div className="rounded-lg border border-border text-card-foreground dark:shadow-md dark:shadow-black/20 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            {/* <Search /> */}
          </div>
          <div className="flex rounded-lg border border-border flex-col gap-3 p-6 pb-2 dark:shadow-md dark:shadow-black/20 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
            <div>
              <h1 className="text-xl">Search Results</h1>
              {/* <h2 class="text-xs">Found {{ coffees.length }} results</h2> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {/* <SearchCoffeeCard
            v-for="coffee in coffees"
            :imported="coffee"
            :key="coffee.id || coffee.name"
          /> */}
            </div>
            <div className="pt-5 pb-2">
              <div className="pt-5 pb-5 text-center">
                <h1>Don't see a coffee ?</h1>
                <Button as-child>
                  <a href="/add-coffee"> Add it to the collection </a>
                </Button>
              </div>
              {/* <Pagination
            v-slot="{ page }"
            :items-per-page="pageSize"
            :total="totalCount"
            :default-page="currentPage"
          >
            <!--TODO FIX this line-->
            <div style="display: none">{{ (currentPage = page) }}</div>
            <PaginationContent v-slot="{ items }">
              <PaginationPrevious :disabled="!hasPrevPage" />

              <template v-for="(item, index) in items" :key="index">
                <PaginationItem
                  v-if="item.type === 'page'"
                  :value="item.value"
                  :is-active="item.value === currentPage"
                >
                  {{ item.value }}
                </PaginationItem>
              </template>
              <PaginationEllipsis :index="4" />
              <PaginationNext :disabled="!hasNextPage" />
            </PaginationContent>
          </Pagination> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
