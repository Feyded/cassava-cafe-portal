export const VariantCategories = {
  snacks: { id: 1, label: "Snacks" },
  refreshers: { id: 2, label: "Refreshers" },
  fruitTea: { id: 3, label: "Fruit Tea" },
  hotCoffee: { id: 4, label: "Hot Coffee" },
  icedCoffee: { id: 5, label: "Iced Coffee" },
  smoothies: { id: 6, label: "Smoothies" },
  yogurtSeries: { id: 7, label: "Yogurt Series" },
  frappe: { id: 8, label: "Frappe" },
} as const;

export const ProductVariantNames = [
  {
    name: "Regular",
    categoryIds: [VariantCategories.snacks.id],
  },
  {
    name: "Small",
    categoryIds: [VariantCategories.snacks.id],
  },
  {
    name: "Medium",
    categoryIds: [VariantCategories.snacks.id],
  },
  {
    name: "Large",
    categoryIds: [VariantCategories.snacks.id],
  },
  {
    name: "8oz",
    categoryIds: [
      VariantCategories.refreshers.id,
      VariantCategories.fruitTea.id,
      VariantCategories.hotCoffee.id,
      VariantCategories.icedCoffee.id,
      VariantCategories.smoothies.id,
      VariantCategories.yogurtSeries.id,
      VariantCategories.frappe.id,
    ],
  },
  {
    name: "12oz",
    categoryIds: [
      VariantCategories.refreshers.id,
      VariantCategories.fruitTea.id,
      VariantCategories.hotCoffee.id,
      VariantCategories.icedCoffee.id,
      VariantCategories.smoothies.id,
      VariantCategories.yogurtSeries.id,
      VariantCategories.frappe.id,
    ],
  },
  {
    name: "16oz",
    categoryIds: [
      VariantCategories.refreshers.id,
      VariantCategories.fruitTea.id,
      VariantCategories.hotCoffee.id,
      VariantCategories.icedCoffee.id,
      VariantCategories.smoothies.id,
      VariantCategories.yogurtSeries.id,
      VariantCategories.frappe.id,
    ],
  },
  {
    name: "20oz",
    categoryIds: [
      VariantCategories.refreshers.id,
      VariantCategories.fruitTea.id,
      VariantCategories.hotCoffee.id,
      VariantCategories.icedCoffee.id,
      VariantCategories.smoothies.id,
      VariantCategories.yogurtSeries.id,
      VariantCategories.frappe.id,
    ],
  },
  {
    name: "22oz",
    categoryIds: [
      VariantCategories.refreshers.id,
      VariantCategories.fruitTea.id,
      VariantCategories.hotCoffee.id,
      VariantCategories.icedCoffee.id,
      VariantCategories.smoothies.id,
      VariantCategories.yogurtSeries.id,
      VariantCategories.frappe.id,
    ],
  },
  {
    name: "32oz",
    categoryIds: [
      VariantCategories.refreshers.id,
      VariantCategories.fruitTea.id,
      VariantCategories.hotCoffee.id,
      VariantCategories.icedCoffee.id,
      VariantCategories.smoothies.id,
      VariantCategories.yogurtSeries.id,
      VariantCategories.frappe.id,
    ],
  },
];
