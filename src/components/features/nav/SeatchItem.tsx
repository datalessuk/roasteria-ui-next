"use client";
import { CommandItem } from "@/components/ui/command";
import { ICoffee } from "@/types/coffee";
import Image from "next/image";

interface SearchResultItemProps {
  coffee: ICoffee;
  onSelect: (item: ICoffee) => void;
}

export default function SearchItem({
  coffee,
  onSelect,
}: SearchResultItemProps) {
  return (
    <CommandItem
      key={coffee?.id}
      onSelect={() => onSelect(coffee)}
      className="flex items-center px-4 py-2 hover:bg-amber-100 cursor-pointer !bg-gray-800 p-2"
    >
      {coffee.image_url && (
        <Image
          src={coffee?.image_url}
          alt={coffee?.name}
          width={32}
          height={32}
          style={{ width: "32px", height: "32px" }}
        />
      )}
      <span className="font-medium text-gray-700 dark:text-gray-200">
        {coffee?.name}
      </span>
    </CommandItem>
  );
}
