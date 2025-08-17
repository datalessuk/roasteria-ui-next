import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IDropDownOption } from "@/types/dropdown";

interface DropDownProps {
  value?: string;
  onChange?: (value: string) => void;
  dropDownOptions: IDropDownOption[];
  placeholder: string;
}

export default function DropDown({
  value,
  onChange,
  dropDownOptions,
  placeholder,
}: DropDownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
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
