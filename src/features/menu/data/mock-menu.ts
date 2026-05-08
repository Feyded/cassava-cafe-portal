export type MenuCategory =
  | 'snacks'
  | 'refreshers'
  | 'fruit-tea'
  | 'hot-coffee'
  | 'iced-coffee'
  | 'smoothies'
  | 'yoghurt-series'
  | 'frappe'

export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  category: MenuCategory
  image: string
  bestseller?: boolean
}

export const menuCategories: { value: MenuCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'refreshers', label: 'Refreshers' },
  { value: 'fruit-tea', label: 'Fruit Tea' },
  { value: 'hot-coffee', label: 'Hot Coffee' },
  { value: 'iced-coffee', label: 'Iced Coffee' },
  { value: 'smoothies', label: 'Smoothies' },
  { value: 'yoghurt-series', label: 'Yoghurt Series' },
  { value: 'frappe', label: 'Frappe' },
]

export const mockMenu: MenuItem[] = [
  // Snacks
  {
    id: 1,
    name: 'Cassava Chips',
    description: 'Thinly sliced cassava, lightly salted and fried to a satisfying crunch.',
    price: 65,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 2,
    name: 'Toasted Brioche',
    description: 'Thick-cut buttered brioche toasted golden, served with honey on the side.',
    price: 95,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Cheese Sticks',
    description: 'Crispy golden pastry sticks filled with stretchy melted cheese.',
    price: 75,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=400&fit=crop',
  },

  // Refreshers
  {
    id: 4,
    name: 'Cucumber Mint Cooler',
    description: 'Fresh cucumber and mint steeped in cold water with a hint of lime.',
    price: 110,
    category: 'refreshers',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 5,
    name: 'Lychee Soda',
    description: 'Sparkling water with lychee syrup, rose water, and crushed ice.',
    price: 115,
    category: 'refreshers',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Calamansi Fizz',
    description: 'Tangy calamansi juice with sparkling water and a salted rim.',
    price: 100,
    category: 'refreshers',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=400&fit=crop',
  },

  // Fruit Tea
  {
    id: 7,
    name: 'Peach Oolong',
    description: 'Floral oolong base blended with ripe peach syrup and ice.',
    price: 120,
    category: 'fruit-tea',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 8,
    name: 'Strawberry Jasmine',
    description: 'Delicate jasmine tea layered with fresh strawberry purée.',
    price: 125,
    category: 'fruit-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop',
  },
  {
    id: 9,
    name: 'Mango Green Tea',
    description: 'Light sencha green tea infused with tropical Carabao mango.',
    price: 115,
    category: 'fruit-tea',
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600&h=400&fit=crop',
  },

  // Hot Coffee
  {
    id: 10,
    name: 'Americano',
    description: 'Two shots of espresso diluted with hot water for a clean, bold cup.',
    price: 110,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=400&fit=crop',
  },
  {
    id: 11,
    name: 'Café Latte',
    description: 'Smooth double-shot espresso with silky steamed whole milk.',
    price: 140,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 12,
    name: 'Flat White',
    description: 'Ristretto shots with microfoam milk for an intense, velvety finish.',
    price: 145,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop',
  },

  // Iced Coffee
  {
    id: 13,
    name: 'Iced Americano',
    description: 'Double espresso shots over ice with a splash of cold water.',
    price: 120,
    category: 'iced-coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 14,
    name: 'Spanish Latte',
    description: 'Espresso poured over condensed milk and cold oat milk on ice.',
    price: 155,
    category: 'iced-coffee',
    image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=600&h=400&fit=crop',
  },
  {
    id: 15,
    name: 'Salted Caramel Cold Brew',
    description: '18-hour cold brew balanced with house-made salted caramel syrup.',
    price: 160,
    category: 'iced-coffee',
    image: 'https://images.unsplash.com/photo-1585090017798-32b49a1ca8d6?w=600&h=400&fit=crop',
  },

  // Smoothies
  {
    id: 16,
    name: 'Avocado Banana',
    description: 'Creamy ripe avocado blended with banana, honey, and almond milk.',
    price: 145,
    category: 'smoothies',
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 17,
    name: 'Mixed Berry Blast',
    description: 'Strawberry, blueberry, and raspberry blended with coconut water.',
    price: 150,
    category: 'smoothies',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=400&fit=crop',
  },
  {
    id: 18,
    name: 'Green Detox',
    description: 'Spinach, cucumber, green apple, and ginger blended smooth.',
    price: 140,
    category: 'smoothies',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&h=400&fit=crop',
  },

  // Yoghurt Series
  {
    id: 19,
    name: 'Mango Yoghurt Drink',
    description: 'Thick Greek yoghurt blended with sweet Carabao mango and honey.',
    price: 135,
    category: 'yoghurt-series',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 20,
    name: 'Strawberry Yoghurt',
    description: 'Chilled yoghurt swirled with fresh strawberry compote and granola.',
    price: 130,
    category: 'yoghurt-series',
    image: 'https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&h=400&fit=crop',
  },
  {
    id: 21,
    name: 'Passion Fruit Yoghurt',
    description: 'Tangy passion fruit coulis stirred into plain yoghurt, served cold.',
    price: 135,
    category: 'yoghurt-series',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600&h=400&fit=crop',
  },

  // Frappe
  {
    id: 22,
    name: 'Classic Mocha Frappe',
    description: 'Blended espresso, chocolate syrup, and cream topped with whipped cream.',
    price: 165,
    category: 'frappe',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=400&fit=crop',
    bestseller: true,
  },
  {
    id: 23,
    name: 'Matcha Frappe',
    description: 'Ceremonial-grade matcha blended with milk and ice, topped with foam.',
    price: 160,
    category: 'frappe',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&h=400&fit=crop',
  },
  {
    id: 24,
    name: 'Caramel Hazelnut Frappe',
    description: 'Rich espresso frappe with caramel and hazelnut swirled together.',
    price: 170,
    category: 'frappe',
    image: 'https://images.unsplash.com/photo-1561339429-4b8-d-4ec7c2-a10b05f95781?w=600&h=400&fit=crop',
  },
]
