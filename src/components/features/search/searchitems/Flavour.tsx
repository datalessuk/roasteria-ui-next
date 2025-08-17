// FlavorFilter.tsx
import { useState } from "react";
import { useUniqueFlavors } from "@/hooks/searchhooks/useGetFlavors";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { FormData } from "@/types/form";

interface FlavorFilterProps {
  control: Control<FormData>;
  selectedFlavors: string[];
}

export function FlavorFilter({ control, selectedFlavors }: FlavorFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { flavors, loading, error } = useUniqueFlavors();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Flavors</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle Flavors</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 px-4">
        <FormField
          control={control}
          name="flavour"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 gap-4">
                {flavors.map((flavor) => (
                  <FormField
                    key={flavor}
                    control={control}
                    name="flavour"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(flavor)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, flavor])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== flavor
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {flavor}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
