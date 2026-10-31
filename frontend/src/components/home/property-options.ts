import type { SelectOption } from "@/components/ui/select";

export const propertyTypeOptions: SelectOption[] = [
  { value: "detached", label: "Detached house" },
  { value: "semi-detached", label: "Semi-detached house" },
  { value: "terraced", label: "Terraced house" },
  { value: "flat", label: "Flat or maisonette" },
  { value: "bungalow", label: "Bungalow" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Not sure" },
];

export const ownershipOptions: SelectOption[] = [
  { value: "own", label: "I own it" },
  { value: "rent", label: "I rent it" },
  { value: "shared", label: "Shared ownership" },
];

export const heatingOptions: SelectOption[] = [
  { value: "gas-boiler", label: "Gas boiler" },
  { value: "electric", label: "Electric heaters" },
  { value: "heat-pump", label: "Heat pump" },
  { value: "oil", label: "Oil or LPG" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Not sure" },
];

export const hotWaterOptions: SelectOption[] = [
  { value: "boiler", label: "From the boiler" },
  { value: "cylinder", label: "Hot water cylinder" },
  { value: "electric", label: "Electric immersion or shower" },
  { value: "unknown", label: "Not sure" },
];

export const loftOptions: SelectOption[] = [
  { value: "full", label: "Yes, well insulated" },
  { value: "partial", label: "Some insulation" },
  { value: "none", label: "No insulation" },
  { value: "unknown", label: "Not sure" },
];

export const wallOptions: SelectOption[] = [
  { value: "cavity-filled", label: "Cavity walls, filled" },
  { value: "cavity-empty", label: "Cavity walls, unfilled" },
  { value: "solid", label: "Solid walls" },
  { value: "unknown", label: "Not sure" },
];

export const epcOptions: SelectOption[] = [
  ...["A", "B", "C", "D", "E", "F", "G"].map((rating) => ({ value: rating, label: rating })),
  { value: "unknown", label: "Not sure" },
];
