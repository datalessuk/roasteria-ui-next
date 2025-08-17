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
import { IDropDownOption, ISearchModel } from "@/types/dropdown";
import DropDown from "../../components/dropdown/DropDown";

interface FlavorFilterProps {
  control: Control<FormData>;
  method: string;
}

const methodOptions: IDropDownOption[] = [
  { value: "washed", text: "Washed" },
  { value: "natural", text: "Natural" },
  { value: "swiss", text: "Swiss Water" },
  { value: "honey", text: "Honey" },
  { value: "semi", text: "Semi Washed" },
  { value: "anaerobic", text: "Anaerobic Fermentation" },
];

export function ProcessingFilter({ control, method }: FlavorFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Processing Methods</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 px-4">
        <FormField
          control={control}
          name="flavour"
          render={() => (
            <FormItem>
              <FormField
                control={control}
                name="processing"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DropDown
                        value={field.value}
                        onChange={field.onChange}
                        dropDownOptions={methodOptions}
                        placeholder="Choose a processing method"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
