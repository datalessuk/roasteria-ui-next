"use client";

import * as React from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetSearch } from "@/hooks/searchhooks/useGetSearch";
import { ICoffee } from "@/types/coffee";
import SearchItem from "./SeatchItem";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "@/hooks/utils/useOutSideClick";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  closeSheet?: () => void; // optional callback to close the sheet
}

export function SearchBar({ closeSheet }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<ICoffee[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => setOpen(false));
  const router = useRouter();

  const filters = useMemo(
    () => ({
      name: query || undefined,
    }),
    [query]
  );
  const { coffees, loading, error } = useGetSearch(filters);

  const handleSelect = (item: ICoffee) => {
    router.push(`/coffee/${item.id}`);
    setQuery("");
    setOpen(false);
  };

  const handleNewCoffee = () => {
    router.push(`/addCoffee`);
    setQuery("");
    setOpen(false);
    closeSheet?.();
  };

  const handleFocus = () => {
    if (query) setOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={handleFocus}
          placeholder="Search coffees..."
          className="w-full  pl-10"
        />
      </div>

      {open && query && (
        <div className="absolute top-full w-full shadow-lg ">
          <Command shouldFilter={false}>
            <CommandList>
              {loading ? (
                <CommandItem disabled>Loading...</CommandItem>
              ) : coffees && coffees.length > 0 ? (
                <CommandGroup>
                  {coffees.map((item: ICoffee) => (
                    <SearchItem
                      key={item.id}
                      coffee={item}
                      onSelect={handleSelect}
                    />
                  ))}
                </CommandGroup>
              ) : (
                <CommandItem className="flex justify-center !bg-gray-800 border border-border">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-400 text-center">
                      Don’t see the coffee you’re looking for?
                    </p>
                    <Button
                      onClick={() => handleNewCoffee()}
                      variant="custom"
                      className="w-full max-w-xs"
                    >
                      Add this coffee
                    </Button>
                  </div>
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
