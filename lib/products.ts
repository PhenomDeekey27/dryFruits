import { createServerSupabaseClient } from './supabase-server'

export type PublicProduct = {
  id: string
  name: string
  category: string
  description: string
  price: number
  imageUrl: string
  badge?: 'BESTSELLER' | 'NEW' | 'LIMITED'
  rating: number
  reviews: number
}

export type PublicCategory = {
  slug: string
  label: string
  imageUrl: string
  featured?: boolean
}

const MOCK_PRODUCTS: PublicProduct[] = [
  {
    id: 'mock-1',
    name: 'King Medjool Reserve',
    category: 'dates',
    description: 'Sun-ripened Medjool dates of extraordinary size and depth, harvested at peak sweetness.',
    price: 34,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcVQe1cC7Q9HqXnKfQojkkDpxH2lPI9DSaaEK2xoSa6quMqFpHUEac9P1vN1VcFv5HnSn5OMZnMQMYwCXFbKjSPlHxUdEIGzs4uwdg3dISwJz8XNmsxu39KJc9WFG0ibIyNDINfOSQma9oF2S9-qR5THI45ogI6sJO0W7liHKNtm1e7UFmB8ItXeXdDKszaaKIP_dqPkjrvTgPSgQz7qk_XFBQx3KobUiydM6dVvgGTkMQ8s4d3EVT-kPXL4XCFWLmzc2OT3AYturs',
    badge: 'BESTSELLER',
    rating: 4.9,
    reviews: 120,
  },
  {
    id: 'mock-2',
    name: 'Volcanic Macadamias',
    category: 'nuts',
    description: 'Hand-selected macadamia nuts from volcanic soil regions, with unmatched creaminess.',
    price: 42,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkRda1bgw7C8-rIscP8Lzc0MXnoPGILhB5ItBFZmbV2wwmjptIxvXhnXIBh8XQoWW2b2N11zdkavZIzAQSS3MFLRRT1mIVFh5WV6qN5WS2Hts7POtcnUyhUREhHk9FAQBhhp9awHM8rhRPFloUsmHQNfhJklgca2dRrVeIByR2UPV9NDOA8koXMcMQCvnEcbVAsABx8uAz4DROy7JnrGxwZjMmQbdS5uq4fMIAFaS4SHBzV3oWcT40L-KdgjvLXekgzdc8hbUqZgn7',
    rating: 5.0,
    reviews: 84,
  },
  {
    id: 'mock-3',
    name: 'Alpine Cranberries',
    category: 'dry-fruits',
    description: 'Ruby-red dried cranberries with a perfect sweet-tart balance from mountain harvests.',
    price: 28,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHx_QctQ8nFRW-6pTGTwL6OWve1e-ZTzKRgBtvF35Jvk_osR_M16WHIHci4jN2TRT_fzvT6xq03_OOSK_FmpVhaPqxMIF43dzy3aaAtF0eCHNOalpvE04tnRUHiewWx_ZmeU8_RwYBynUjYabNj23admTPfxUjTk51wdGJZOlQ9e33SWKcXSWm3TcUvtgbb8WC6_CNJVyOsJOYJO3AEQwVnScasahbxZLr6CUO8wWyB0kZoSQLIZA0eGBvdbVz4CErg30zy96ZRqGT',
    badge: 'NEW',
    rating: 4.8,
    reviews: 52,
  },
  {
    id: 'mock-4',
    name: 'The Heirloom Sampler',
    category: 'gift',
    description: 'A curated collection of our finest varieties, presented in heritage packaging.',
    price: 85,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWW62KYs7cAJM_3uSLG9_mxYAXyZsbLnrZgqTCZb239T9h57ik0ph5Ck-8ZFT4N0GTaxdkLLrp_yc7WzHD3DsKvy6E8wulDGnpC-pSn2FEZdA_vzhoQOZtqwwvZ6k_z_sQVhZ-RXz24Gi1LV_RW9mxCynwGimPnxu_SsnReclZBot16t93Bde6Ogh6lIZQLKIOYQTUYr_LfoEuI0S0mZssEYcBk7gD9DuzTg5Si0C6HndOWUZ2icHdLXByuNXc0vi5AB5zrPNG744A',
    rating: 4.9,
    reviews: 215,
  },
  {
    id: 'mock-5',
    name: 'Persian Saffron Dates',
    category: 'dates',
    description: 'Medjool dates infused with premium Persian saffron threads — a rare delicacy.',
    price: 56,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLqP28xin1AwlOz78QT42V1YHZWl6OMktnlOcn-RjDXCQH43_V5y6O6-0Bvon0GjiYi6sLO9iGPKLYnpw5GU8yojmndGumrLO2KrbUbaq9ywGynjymNiL2zwYd5yNkJxT6wQDy2ME7mf1vBdYmMyj8y62XlCv4MTOFGNK8gvKNFsLNBPynIojgxgkggXjWqDV4Ae4PQXIL5z-Temde903HF042V827IOHU1lcB_Ju07xRknLSUKlT2gCXSgJrE71Z31tWH1mycrZ5Z',
    badge: 'LIMITED',
    rating: 5.0,
    reviews: 38,
  },
  {
    id: 'mock-6',
    name: 'Marcona Almonds',
    category: 'nuts',
    description: 'Spanish hand-polished Marcona almonds — the most prized variety in the world.',
    price: 38,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBcRdUF3aZpIz7LzMqB71Bjz_ARdilrkIsIvpgBWgTXQH6aNfnwSkMnIj_iwKusP7sZJ98jBAcwUoP32hOPFZ2Uc2VCuKwXL7TPZqEKepT3S09_NmU_0hXF-TJpUURSrZNovLyeGVZsT2_4WW3Jver-oCb4xTua2oAp7eWTNw7GMK8-1u5kaHGVkUYcxccVoeE4KDl82YQUHAxrNziHGLzF5Zv_AmyEISCfIQ_nLBmLi4TVbDaembpOL2XvhsHvmweuBWFOOjP2SXj',
    badge: 'NEW',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 'mock-7',
    name: 'Heirloom Pumpkin Seeds',
    category: 'seeds',
    description: 'Slow-roasted heritage pumpkin seeds with a toasted, nutty complexity.',
    price: 22,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzuALZ1z1H7EufwIMwzfRidm7h8lyiIs9RyO9Qq8i5x1xnbm98HZjPQMGk8W3FZZT-U3CZdeoCXDbGoeEJQC7dYkJEo2WYedsIGuAooDWyldUdFNfbfvjeSZGehYBTfInRX8s7K32GlV6Vk2UTGMZfZHfbuNhLCw4C6bMgJ_OqeyjHlVshc0xHOAwoMAswConufmXTscDDa92A9trnRPRJMGU3O_YAA_ETc0K1X1ZHlwGCcQaNlorhsBeMuYQP1JYIXPX7Nb6eaq1W',
    rating: 4.6,
    reviews: 29,
  },
  {
    id: 'mock-8',
    name: 'Orchard Apricots',
    category: 'dry-fruits',
    description: 'Sun-dried Turkish apricots from orchard-grown trees, intensely sweet and floral.',
    price: 26,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwTkpU8ncEJFl1k54M4gUDaYL8jrzr8-x2IbjC8xn0GjRBox6IoSatvSMaxLa-WRc8sxmgiWXkC-a71RnI6uX_IWx8y55sH_F6wD9tXYau6_27mjc9ThkCiMAnkm1zREeitWSS1HK5TiCp6eNQyBMupmPKRwzQDyOHUXM5HLWCTfHq5CB0YnUhSiHBFtReM58Hlw7s8xxp3n9u94cbSO_igg9hYaa5n5K8dFOh6h0lqJ65VTIbF-RWlTvEOTchhHYaAdBoQ9M5R63J',
    rating: 4.8,
    reviews: 91,
  },
]

export async function getFeaturedProducts(): Promise<PublicProduct[]> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants ( price, weight, stock ),
        product_images ( image_url )
      `)
      .limit(8)

    if (error || !data?.length) return MOCK_PRODUCTS

    return data.map((p, i) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description ?? '',
      price: p.product_variants?.[0]?.price ?? 0,
      imageUrl: p.product_images?.[0]?.image_url ?? MOCK_PRODUCTS[i % MOCK_PRODUCTS.length].imageUrl,
      badge: undefined,
      rating: 4.8,
      reviews: Math.floor(Math.random() * 200) + 10,
    }))
  } catch {
    return MOCK_PRODUCTS
  }
}
