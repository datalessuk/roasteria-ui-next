import { Suspense } from "react";
import Search from "@/app/search/Search";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <Search />
    </Suspense>
  );
}
