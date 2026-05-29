// ============================================================
// LUXÉ FASHION - Application Types
// ============================================================

export type UserRole = 'customer' | 'admin' | 'super_admin'
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type ProductCategory = 'clothing' | 'watches' | 'accessories' | 'jewelry'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
export type GenderType = 'men' | 'women' | 'unisex' | 'kids'

// ============================================================
// USER & PROFILE
// ============================================================

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  role: UserRole
  date_of_birth: string | null
  gender: GenderType | null
  newsletter_subscribed: boolean
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  label: string
  full_name: string
  phone: string | null
  address_line1: string
  address_line2: string | null
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
}

// ============================================================
// PRODUCT
// ============================================================

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  product_type: ProductCategory
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text: string | null
  sort_order: number
  is_primary: boolean
  created_at: string
}

export interface VariantOption {
  id: string
  variant_id: string
  option_name: string
  option_value: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string | null
  price: number | null
  compare_price: number | null
  stock_quantity: number
  is_active: boolean
  created_at: string
  options?: VariantOption[]
}

export interface ClothingSpecs {
  id: string
  product_id: string
  material: string | null
  care_instructions: string | null
  fit_type: string | null
  country_of_origin: string | null
  season: string | null
  style_code: string | null
}

export interface WatchSpecs {
  id: string
  product_id: string
  movement_type: string | null
  case_material: string | null
  case_diameter_mm: number | null
  case_thickness_mm: number | null
  dial_color: string | null
  dial_material: string | null
  crystal_type: string | null
  water_resistance_atm: number | null
  strap_material: string | null
  strap_width_mm: number | null
  clasp_type: string | null
  power_reserve_hours: number | null
  functions: string[] | null
  limited_edition: boolean
  edition_number: string | null
  reference_number: string | null
}

export interface ReviewStats {
  review_count: number
  avg_rating: number
  five_star: number
  four_star: number
  three_star: number
  two_star: number
  one_star: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  category_id: string | null
  product_type: ProductCategory
  gender: GenderType
  base_price: number
  compare_price: number | null
  cost_price: number | null
  sku: string | null
  barcode: string | null
  is_active: boolean
  is_featured: boolean
  is_new_arrival: boolean
  is_bestseller: boolean
  tags: string[] | null
  meta_title: string | null
  meta_description: string | null
  weight_grams: number | null
  created_at: string
  updated_at: string
  // Relations
  images?: ProductImage[]
  variants?: ProductVariant[]
  category?: Category
  clothing_specs?: ClothingSpecs
  watch_specs?: WatchSpecs
  review_stats?: ReviewStats
}

// ============================================================
// CART
// ============================================================

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  variant_id: string | null
  quantity: number
  added_at: string
  // Relations
  product?: Product
  variant?: ProductVariant
}

export interface CartState {
  items: CartItem[]
  isLoading: boolean
  total: number
  itemCount: number
}

// ============================================================
// WISHLIST
// ============================================================

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  added_at: string
  product?: Product
}

// ============================================================
// ORDERS
// ============================================================

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string | null
  product_name: string
  variant_name: string | null
  product_image: string | null
  sku: string | null
  quantity: number
  unit_price: number
  total_price: number
  product?: Product
}

export interface Order {
  id: string
  order_number: string
  user_id: string | null
  status: OrderStatus
  subtotal: number
  discount_amount: number
  shipping_amount: number
  tax_amount: number
  total_amount: number
  coupon_id: string | null
  coupon_code: string | null
  shipping_name: string
  shipping_phone: string | null
  shipping_address1: string
  shipping_address2: string | null
  shipping_city: string
  shipping_state: string
  shipping_postal_code: string
  shipping_country: string
  tracking_number: string | null
  carrier: string | null
  shipped_at: string | null
  delivered_at: string | null
  customer_notes: string | null
  admin_notes: string | null
  payment_status: PaymentStatus
  stripe_payment_intent_id: string | null
  created_at: string
  updated_at: string
  // Relations
  items?: OrderItem[]
  user?: Profile
}

// ============================================================
// REVIEWS
// ============================================================

export interface Review {
  id: string
  product_id: string
  user_id: string
  order_id: string | null
  rating: number
  title: string | null
  body: string | null
  is_verified_purchase: boolean
  is_approved: boolean
  helpful_votes: number
  created_at: string
  updated_at: string
  user?: Profile
}

// ============================================================
// COUPONS
// ============================================================

export interface Coupon {
  id: string
  code: string
  description: string | null
  discount_type: 'percentage' | 'fixed_amount' | 'free_shipping'
  discount_value: number
  minimum_order_amount: number | null
  maximum_discount_amount: number | null
  usage_limit: number | null
  usage_count: number
  per_user_limit: number
  valid_from: string | null
  valid_until: string | null
  is_active: boolean
  created_at: string
}

// ============================================================
// BANNERS
// ============================================================

export interface Banner {
  id: string
  title: string
  subtitle: string | null
  image_url: string
  link_url: string | null
  button_text: string | null
  position: string
  is_active: boolean
  sort_order: number
  valid_from: string | null
  valid_until: string | null
  created_at: string
}

// ============================================================
// CHECKOUT
// ============================================================

export interface CheckoutForm {
  email: string
  full_name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  save_address?: boolean
  customer_notes?: string
}

export interface CheckoutState {
  step: 'cart' | 'shipping' | 'payment' | 'confirmation'
  shippingAddress: CheckoutForm | null
  selectedAddressId: string | null
  couponCode: string | null
  couponDiscount: number
  paymentIntentId: string | null
}

// ============================================================
// ADMIN / ANALYTICS
// ============================================================

export interface DashboardStats {
  totalRevenue: number
  revenueGrowth: number
  totalOrders: number
  ordersGrowth: number
  totalCustomers: number
  customersGrowth: number
  totalProducts: number
  lowStockCount: number
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  orders: number
}

export interface TopProduct {
  product_id: string
  product_name: string
  total_sold: number
  total_revenue: number
  image_url: string | null
}

// ============================================================
// FILTERS
// ============================================================

export interface ProductFilters {
  category?: string
  product_type?: ProductCategory
  gender?: GenderType
  min_price?: number
  max_price?: number
  tags?: string[]
  in_stock?: boolean
  is_featured?: boolean
  is_new_arrival?: boolean
  search?: string
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating'
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
