import { Metadata } from 'next'
import { ProductDetailPage } from '@/features/products/product-detail-page'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | LUXÉ`,
  }
}

export default function ProductPage({ params }: Props) {
  return <ProductDetailPage slug={params.slug} />
}

export const dynamic = 'force-dynamic'
