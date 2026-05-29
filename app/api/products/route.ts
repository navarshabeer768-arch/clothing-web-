import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ProductFilters } from '@/types'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)

  const filters: ProductFilters = {
    category: searchParams.get('category') ?? undefined,
    product_type: searchParams.get('product_type') as ProductFilters['product_type'] ?? undefined,
    gender: searchParams.get('gender') as ProductFilters['gender'] ?? undefined,
    min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
    max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
    search: searchParams.get('search') ?? undefined,
    is_featured: searchParams.get('is_featured') === 'true' ? true : undefined,
    is_new_arrival: searchParams.get('is_new_arrival') === 'true' ? true : undefined,
    sort: searchParams.get('sort') as ProductFilters['sort'] ?? 'newest',
    page: Number(searchParams.get('page') ?? 1),
    limit: Number(searchParams.get('limit') ?? 24),
  }

  let query = supabase
    .from('products')
    .select(`
      *,
      images:product_images(id, url, alt_text, is_primary, sort_order),
      variants:product_variants(id, name, sku, price, stock_quantity, is_active),
      category:categories(id, name, slug),
      review_stats:product_review_stats(avg_rating, review_count)
    `, { count: 'exact' })
    .eq('is_active', true)

  // Apply filters
  if (filters.product_type) query = query.eq('product_type', filters.product_type)
  if (filters.gender) query = query.eq('gender', filters.gender)
  if (filters.is_featured !== undefined) query = query.eq('is_featured', filters.is_featured)
  if (filters.is_new_arrival !== undefined) query = query.eq('is_new_arrival', filters.is_new_arrival)
  if (filters.min_price !== undefined) query = query.gte('base_price', filters.min_price)
  if (filters.max_price !== undefined) query = query.lte('base_price', filters.max_price)

  if (filters.search) {
    query = query.textSearch('name', filters.search, { type: 'websearch' })
  }

  // Sorting
  switch (filters.sort) {
    case 'price_asc':
      query = query.order('base_price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('base_price', { ascending: false })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
  }

  // Pagination
  const page = filters.page ?? 1
  const limit = filters.limit ?? 24
  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data,
    total: count ?? 0,
    page,
    limit,
    hasMore: (count ?? 0) > page * limit,
  })
}
