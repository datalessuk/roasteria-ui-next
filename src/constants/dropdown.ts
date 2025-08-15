import type { IDropDownOption } from "@/types/dropdown";

export const roastLevelDropDownOptions: IDropDownOption[] = [
  { value: "light", text: "Light" },
  { value: "medium", text: "Medium" },
  { value: "dark", text: "Dark" },
];

export const processingMethodDropDownOptions: IDropDownOption[] = [
  { value: "washed", text: "Washed" },
  { value: "white honey / washed", text: "White Honey / Washed" },
  { value: "swiss water", text: "Swiss Water" },
  { value: "natural", text: "Natural" },
  { value: "honey", text: "Honey" },
  { value: "semi Washed", text: "Semi Washed" },
  { value: "anaerobic Fermentation", text: "Anaerobic Fermentation" },
];

export const singleOriginDropDownOptions: IDropDownOption[] = [
  { value: "all", text: "All Coffees" },
  { value: "true", text: "Single Origin" },
  { value: "false", text: "Blends" },
];
