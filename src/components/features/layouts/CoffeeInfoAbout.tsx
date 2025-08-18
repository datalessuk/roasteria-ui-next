import { ICoffee } from "@/types/coffee";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CoffeeProps {
  coffee: ICoffee | null;
}

export default function CoffeeInfoAbout({ coffee }: CoffeeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const maxWords = 25;
  const words = useMemo(
    () => coffee?.description?.split(/\s+/) ?? [],
    [coffee?.description]
  );

  const isLong = useMemo(() => words.length > maxWords, [words]);

  const previewText = useMemo(
    () =>
      isLong
        ? words.slice(0, maxWords).join(" ") + "..."
        : coffee?.description ?? "",
    [isLong, words, coffee?.description]
  );

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-colors">
      <div>
        {!isLong ? (
          <p>{coffee?.description}</p>
        ) : (
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2"
          >
            <p className="text-sm">{previewText}</p>

            <CollapsibleContent>
              <p className="whitespace-pre-wrap">{coffee?.description}</p>
            </CollapsibleContent>

            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-24 p-0 underline cursor-pointer"
              >
                {isOpen ? "Show less" : "Show more"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </div>
    </div>
  );
}
