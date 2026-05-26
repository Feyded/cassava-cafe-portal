export const VariantCategories = {
  snacks: 1,
  refreshers: 2,
  fruitTea: 3,
  hotCoffee: 4,
  icedCoffee: 5,
  smoothies: 6,
  yogurtSeries: 7,
  frappe: 8,
} as const;

export const ProductVariantNames = [
  {
    name: "Regular",
    categoryIds: [VariantCategories.snacks],
  },
  {
    name: "Small",
    categoryIds: [VariantCategories.snacks],
  },
  {
    name: "Medium",
    categoryIds: [VariantCategories.snacks],
  },
  {
    name: "Large",
    categoryIds: [VariantCategories.snacks],
  },
  {
    name: "8oz",
    categoryIds: [
      VariantCategories.refreshers,
      VariantCategories.fruitTea,
      VariantCategories.hotCoffee,
      VariantCategories.icedCoffee,
      VariantCategories.smoothies,
      VariantCategories.yogurtSeries,
      VariantCategories.frappe,
    ],
  },
  {
    name: "12oz",
    categoryIds: [
      VariantCategories.refreshers,
      VariantCategories.fruitTea,
      VariantCategories.hotCoffee,
      VariantCategories.icedCoffee,
      VariantCategories.smoothies,
      VariantCategories.yogurtSeries,
      VariantCategories.frappe,
    ],
  },
  {
    name: "16oz",
    categoryIds: [
      VariantCategories.refreshers,
      VariantCategories.fruitTea,
      VariantCategories.hotCoffee,
      VariantCategories.icedCoffee,
      VariantCategories.smoothies,
      VariantCategories.yogurtSeries,
      VariantCategories.frappe,
    ],
  },
  {
    name: "20oz",
    categoryIds: [
      VariantCategories.refreshers,
      VariantCategories.fruitTea,
      VariantCategories.hotCoffee,
      VariantCategories.icedCoffee,
      VariantCategories.smoothies,
      VariantCategories.yogurtSeries,
      VariantCategories.frappe,
    ],
  },
  {
    name: "22oz",
    categoryIds: [
      VariantCategories.refreshers,
      VariantCategories.fruitTea,
      VariantCategories.hotCoffee,
      VariantCategories.icedCoffee,
      VariantCategories.smoothies,
      VariantCategories.yogurtSeries,
      VariantCategories.frappe,
    ],
  },
  {
    name: "32oz",
    categoryIds: [
      VariantCategories.refreshers,
      VariantCategories.fruitTea,
      VariantCategories.hotCoffee,
      VariantCategories.icedCoffee,
      VariantCategories.smoothies,
      VariantCategories.yogurtSeries,
      VariantCategories.frappe,
    ],
  },
];
