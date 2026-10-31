import type { HomeImprovement, ProfileSection } from "@/types/property";

export const sampleProfile: ProfileSection[] = [
  {
    id: "property",
    title: "Property",
    fields: [
      { label: "Property type", value: "Semi-detached house" },
      { label: "Ownership", value: "Owner" },
      { label: "Bedrooms", value: "3" },
      { label: "Built", value: "1930s" },
    ],
  },
  {
    id: "location",
    title: "Location",
    fields: [
      { label: "Postcode area", value: "BS6" },
      { label: "Region", value: "South West England" },
    ],
  },
  {
    id: "heating",
    title: "Heating and hot water",
    fields: [
      { label: "Heating", value: "Gas combi boiler" },
      { label: "Boiler age", value: "About 9 years" },
      { label: "Hot water", value: "From the boiler" },
    ],
  },
  {
    id: "insulation",
    title: "Insulation and efficiency",
    fields: [
      { label: "Loft insulation", value: "Partial (around 100mm)" },
      { label: "Walls", value: "Cavity, filled" },
      { label: "Windows", value: "Double glazed" },
      { label: "EPC rating", value: null },
    ],
  },
  {
    id: "solar",
    title: "Solar and battery",
    fields: [
      { label: "Solar panels", value: "None" },
      { label: "Home battery", value: "None" },
      { label: "Roof direction", value: null },
    ],
  },
  {
    id: "usage",
    title: "Energy usage",
    fields: [
      { label: "Annual electricity", value: null },
      { label: "Annual gas", value: null },
    ],
  },
];

export const sampleImprovements: HomeImprovement[] = [
  {
    id: "insulation",
    title: "Loft insulation top-up",
    suitability: "likely-suitable",
    summary: "Topping up from around 100mm to 270mm is one of the lowest-cost improvements.",
    typicalCost: { min: 300, max: 600 },
    benefits: "Less heat lost through the roof, so lower gas use and a warmer home.",
    limitations: "The loft must be accessible and dry. Stored items may need moving.",
    infoNeeded: [],
  },
  {
    id: "draught-proofing",
    title: "Draught proofing",
    suitability: "likely-suitable",
    summary: "Sealing gaps around doors, windows and floorboards is quick and often DIY-friendly.",
    typicalCost: { min: 100, max: 300 },
    benefits: "Fewer draughts and a more comfortable home for a small outlay.",
    limitations: "Rooms still need ventilation, especially kitchens and bathrooms.",
    infoNeeded: [],
  },
  {
    id: "heating",
    title: "Heating controls",
    suitability: "worth-checking",
    summary: "Smart thermostats and radiator valves can help you heat only the rooms you use.",
    typicalCost: { min: 150, max: 400 },
    benefits: "More control over when and where you heat your home.",
    limitations: "Savings depend on your routine. Little benefit if you already heat carefully.",
    infoNeeded: ["Your current thermostat type"],
  },
  {
    id: "solar",
    title: "Solar panels",
    suitability: "needs-info",
    summary: "Whether solar is worthwhile depends on your roof and when you use electricity.",
    typicalCost: { min: 5000, max: 9000 },
    benefits: "Generates your own electricity and can reduce what you buy from the grid.",
    limitations: "Not every roof is suitable. Payback is long and depends on your usage.",
    infoNeeded: ["Roof direction", "Shading from trees or buildings", "Annual electricity use"],
  },
  {
    id: "battery",
    title: "Home battery",
    suitability: "unlikely",
    summary: "Without solar panels or a time-of-use tariff, a battery is unlikely to pay for itself.",
    typicalCost: { min: 3000, max: 6000 },
    benefits: "Stores cheaper or self-generated electricity to use later.",
    limitations: "High upfront cost. Most useful alongside solar panels.",
    infoNeeded: [],
  },
  {
    id: "ev-charging",
    title: "EV charging",
    suitability: "needs-info",
    summary: "Only relevant if you have, or plan to get, an electric vehicle.",
    typicalCost: { min: 800, max: 1200 },
    benefits: "Cheaper overnight charging than public chargers.",
    limitations: "Needs off-street parking near the property.",
    infoNeeded: ["Whether you have off-street parking", "Whether you have an electric vehicle"],
  },
];
