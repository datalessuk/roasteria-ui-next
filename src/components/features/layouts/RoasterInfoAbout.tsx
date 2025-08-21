import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RoasterProps {
  about: string | null;
}

export default function RoasterInfoAbout({ about }: RoasterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const maxWords = 25;
  const words = useMemo(() => about?.split(/\s+/) ?? [], [about]);

  const isLong = useMemo(() => words.length > maxWords, [words]);

  const previewText = useMemo(
    () => (isLong ? words.slice(0, maxWords).join(" ") + "..." : about ?? ""),
    [isLong, words, about]
  );

  return (
    <div className="">
      <div>
        {!isLong ? (
          <p>{}</p>
        ) : (
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2"
          >
            <p className="text-sm">{previewText}</p>

            <CollapsibleContent>
              <p className="whitespace-pre-wrap">{about}</p>
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
