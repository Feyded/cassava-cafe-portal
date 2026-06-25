export interface ModifierGroup {
  id: number;
  name: string;
  min_selection: number;
  max_selection: number;
  created_at: string;
  updated_at: string;
  modifiers: Modifier[];
}

export interface Modifier {
  id: number;
  modifier_group_id: number;
  name: string;
  price: string;
  created_at: string;
  updated_at: string;
}
