import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IDropDownOption } from "@/types/dropdown";

interface DropDownProps {
  modelValue?: string;
  onChange?: (value: string) => void;
  dropDownOptions: IDropDownOption[];
  placeHolder: string;
}

export default function DropDown({
  modelValue,
  onChange,
  dropDownOptions,
  placeHolder,
}: DropDownProps) {
  return (
    <Select value={modelValue} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {dropDownOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
