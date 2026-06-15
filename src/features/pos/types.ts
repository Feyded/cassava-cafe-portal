export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Classic Espresso', sku: 'COF-001', price: 3.50, category: 'Beverages' },
  { id: '2', name: 'Iced Caramel Latte', sku: 'COF-002', price: 4.75, category: 'Beverages' },
  { id: '3', name: 'Butter Croissant', sku: 'BAK-001', price: 2.99, category: 'Bakery' },
  { id: '4', name: 'Chocolate Muffin', sku: 'BAK-002', price: 3.25, category: 'Bakery' },
  { id: '5', name: 'Avocado Sourdough Toast', sku: 'BRN-001', price: 8.50, category: 'Brunch' },
  { id: '6', name: 'Earl Grey Tea', sku: 'TE-001', price: 3.00, category: 'Beverages' },
];

export const CATEGORIES = ['All', 'Beverages', 'Bakery', 'Brunch'];