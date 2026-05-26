export type InventoryCategory = {
  id: number;
  name: string;
};

export interface CreateInventoryCategoryPayload {
  name: string;
}
