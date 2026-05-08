import type { Product } from '@/types/product'

// Using Unsplash for demo images – real project would use your own CDN
const PLACEHOLDER = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const PRODUCTS: Product[] = [
  {
    id: 'cassava-latte',
    name: 'Cassava Latte',
    description:
      'A smooth, creamy latte made with house-roasted espresso and our signature cassava-based oat milk. Subtly sweet with a nutty finish.',
    price: 6.5,
    images: [
      { id: 'cl-1', url: PLACEHOLDER('coffee1'), alt: 'Cassava Latte in a ceramic mug' },
      { id: 'cl-2', url: PLACEHOLDER('coffee2'), alt: 'Cassava Latte top-down' },
      { id: 'cl-3', url: PLACEHOLDER('coffee3'), alt: 'Cassava Latte side view' },
    ],
    variants: [
      { id: 'size', name: 'Size', options: ['Small', 'Medium', 'Large'] },
      { id: 'milk', name: 'Milk', options: ['Cassava Oat', 'Whole', 'Almond', 'Soy'] },
      { id: 'temp', name: 'Temperature', options: ['Hot', 'Iced'] },
    ],
    category: 'Coffee',
    tags: ['latte', 'signature', 'bestseller'],
    inStock: true,
    featured: true,
  },
  {
    id: 'cold-brew-tonic',
    name: 'Cold Brew Tonic',
    description:
      'Bold 24-hour cold brew poured over sparkling tonic with a hint of citrus zest. Refreshing and energising.',
    price: 7.0,
    images: [
      { id: 'cbt-1', url: PLACEHOLDER('coldbrew1'), alt: 'Cold Brew Tonic glass' },
      { id: 'cbt-2', url: PLACEHOLDER('coldbrew2'), alt: 'Cold Brew Tonic close-up' },
      { id: 'cbt-3', url: PLACEHOLDER('coldbrew3'), alt: 'Cold Brew Tonic overhead' },
    ],
    variants: [
      { id: 'size', name: 'Size', options: ['Regular', 'Large'] },
      { id: 'syrup', name: 'Syrup', options: ['None', 'Vanilla', 'Caramel', 'Hazelnut'] },
    ],
    category: 'Coffee',
    tags: ['cold brew', 'refreshing', 'new'],
    inStock: true,
    featured: true,
  },
  {
    id: 'matcha-ceremonial',
    name: 'Ceremonial Matcha',
    description:
      'Grade-A ceremonial matcha whisked to a silky foam, served with your choice of milk or as a traditional hot bowl.',
    price: 6.0,
    images: [
      { id: 'mc-1', url: PLACEHOLDER('matcha1'), alt: 'Matcha bowl with whisk' },
      { id: 'mc-2', url: PLACEHOLDER('matcha2'), alt: 'Matcha latte art' },
      { id: 'mc-3', url: PLACEHOLDER('matcha3'), alt: 'Matcha preparation' },
    ],
    variants: [
      { id: 'style', name: 'Style', options: ['Traditional Bowl', 'Latte', 'Iced Latte'] },
      { id: 'milk', name: 'Milk', options: ['Whole', 'Oat', 'Almond', 'Soy'] },
      { id: 'sweetness', name: 'Sweetness', options: ['None', 'Light', 'Regular', 'Extra'] },
    ],
    category: 'Tea',
    tags: ['matcha', 'vegan', 'antioxidant'],
    inStock: true,
    featured: true,
  },
  {
    id: 'butter-croissant',
    name: 'Butter Croissant',
    description:
      'Laminated with French AOP butter and baked fresh each morning. Shatteringly crisp outside, pillowy inside.',
    price: 4.5,
    images: [
      { id: 'bc-1', url: PLACEHOLDER('pastry1'), alt: 'Butter croissant on plate' },
      { id: 'bc-2', url: PLACEHOLDER('pastry2'), alt: 'Croissant layers close-up' },
      { id: 'bc-3', url: PLACEHOLDER('pastry3'), alt: 'Croissant basket' },
    ],
    variants: [
      { id: 'filling', name: 'Filling', options: ['Plain', 'Almond', 'Chocolate', 'Ham & Cheese'] },
    ],
    category: 'Pastry',
    tags: ['bakery', 'fresh', 'viennoiserie'],
    inStock: true,
  },
  {
    id: 'pour-over-single',
    name: 'Pour Over — Single Origin',
    description:
      'Rotating single-origin beans brewed to order. Ask your barista about today\'s origin and tasting notes.',
    price: 7.5,
    images: [
      { id: 'po-1', url: PLACEHOLDER('pourover1'), alt: 'Pour over brewing' },
      { id: 'po-2', url: PLACEHOLDER('pourover2'), alt: 'Pour over cup' },
      { id: 'po-3', url: PLACEHOLDER('pourover3'), alt: 'Coffee bloom' },
    ],
    variants: [
      { id: 'grind', name: 'Grind', options: ['Whole Bean', 'Filter', 'Espresso'] },
    ],
    category: 'Coffee',
    tags: ['single origin', 'specialty', 'seasonal'],
    inStock: true,
  },
  {
    id: 'cassava-brownie',
    name: 'Cassava Fudge Brownie',
    description:
      'Gluten-free brownie made with 100% cassava flour, dark chocolate, and a sea-salt flake finish. Dense, fudgy, indulgent.',
    price: 5.0,
    images: [
      { id: 'cbr-1', url: PLACEHOLDER('brownie1'), alt: 'Brownie on board' },
      { id: 'cbr-2', url: PLACEHOLDER('brownie2'), alt: 'Brownie cross-section' },
      { id: 'cbr-3', url: PLACEHOLDER('brownie3'), alt: 'Brownie with coffee' },
    ],
    variants: [
      { id: 'qty', name: 'Quantity', options: ['Single', 'Box of 4', 'Box of 8'] },
    ],
    category: 'Pastry',
    tags: ['gluten-free', 'chocolate', 'signature'],
    inStock: true,
    featured: true,
  },
  {
    id: 'hibiscus-cooler',
    name: 'Hibiscus Rose Cooler',
    description:
      'Tart hibiscus flower cold-steeped overnight, blended with rose water and topped with sparkling water.',
    price: 5.5,
    images: [
      { id: 'hr-1', url: PLACEHOLDER('hibiscus1'), alt: 'Hibiscus drink in tall glass' },
      { id: 'hr-2', url: PLACEHOLDER('hibiscus2'), alt: 'Hibiscus rose drink top view' },
    ],
    variants: [
      { id: 'size', name: 'Size', options: ['Regular', 'Large'] },
      { id: 'sweetness', name: 'Sweetness', options: ['Unsweetened', 'Light', 'Regular'] },
    ],
    category: 'Drinks',
    tags: ['caffeine-free', 'floral', 'refreshing'],
    inStock: true,
  },
  {
    id: 'cortado',
    name: 'Cortado',
    description:
      'Equal parts espresso and warm whole milk. Simple, balanced, no-nonsense — for the purist.',
    price: 5.0,
    images: [
      { id: 'co-1', url: PLACEHOLDER('cortado1'), alt: 'Cortado in gibraltar glass' },
      { id: 'co-2', url: PLACEHOLDER('cortado2'), alt: 'Cortado latte art' },
    ],
    variants: [
      { id: 'milk', name: 'Milk', options: ['Whole', 'Oat', 'Almond'] },
    ],
    category: 'Coffee',
    tags: ['espresso', 'classic'],
    inStock: false,
  },
]

export const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))]

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured)
