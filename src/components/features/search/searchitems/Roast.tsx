import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { FormData } from "@/types/form";
import { IDropDownOption } from "@/types/dropdown";
import DropDown from "../../components/dropdown/DropDown";

interface FlavorFilterProps {
  control: Control<FormData>;
  roast: string;
}

const roastOptions: IDropDownOption[] = [
  { value: "light", text: "Light" },
  { value: "medium", text: "Medium" },
  { value: "dark", text: "Dark" },
];

export function RoastFilter({ control, roast }: FlavorFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Roast Level</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 px-4">
        <FormField
          control={control}
          name="roast"
          render={() => (
            <FormItem>
              <FormField
                control={control}
                name="roast"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DropDown
                        value={field.value}
                        onChange={field.onChange}
                        dropDownOptions={roastOptions}
                        placeholder="Choose a roast level"
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
