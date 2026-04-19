/**
 * Bulk Product Insertion Script
 * Add 40+ dry fruits products to Supabase
 *
 * Usage:
 * npx tsx scripts/bulk-insert-products.ts
 *
 * Make sure SUPABASE_SERVICE_ROLE_KEY is in .env.local
 */

import { createClient } from '@supabase/supabase-js'

interface ProductToInsert {
  name: string
  category: string
  description: string
  imageUrl: string
  variants?: {
    weight: string
    price: number
    stock: number
  }[]
}

// Free image sources: Unsplash, Pexels, pixabay
const PRODUCTS: ProductToInsert[] = [
  // === DATES (14 products) ===
  {
    name: '200gm Seeded Dates',
    category: 'Dates',
    description: 'Premium quality seeded dates, 200gm pack. Rich in natural sugars and nutrients.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 199, stock: 50 },
    ],
  },
  {
    name: '200gm Seedless Dates',
    category: 'Dates',
    description: 'Soft and sweet seedless dates without the pit. Perfect for snacking, 200gm.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 229, stock: 45 },
    ],
  },
  {
    name: '200gm Muscat Dates',
    category: 'Dates',
    description: 'Golden Muscat dates with unique flavor, 200gm pack.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 249, stock: 40 },
    ],
  },
  {
    name: '500gm Seeded Dates',
    category: 'Dates',
    description: 'Bulk pack of premium seeded dates, 500gm. Value for money.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '500gm', price: 449, stock: 35 },
    ],
  },
  {
    name: '500gm Seeded (1+1) Free',
    category: 'Dates',
    description: 'Buy one 500gm pack, get one free! Limited time offer on seeded dates.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '500gm x2', price: 449, stock: 30 },
    ],
  },
  {
    name: '500gm Seedless Dates',
    category: 'Dates',
    description: 'Convenient seedless dates in 500gm bulk pack.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '500gm', price: 499, stock: 40 },
    ],
  },
  {
    name: '500gm Muscat Dates',
    category: 'Dates',
    description: 'Golden Muscat dates bulk pack, 500gm. Premium quality.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '500gm', price: 549, stock: 35 },
    ],
  },
  {
    name: '500gm Seedless Box',
    category: 'Dates',
    description: 'Premium gift-boxed seedless dates, 500gm. Perfect for gifting.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '500gm', price: 599, stock: 25 },
    ],
  },
  {
    name: '250gm Seedless Box',
    category: 'Dates',
    description: 'Elegant gift box of seedless dates, 250gm. Premium packaging.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '250gm', price: 349, stock: 30 },
    ],
  },
  {
    name: '500gm Muscat Box',
    category: 'Dates',
    description: 'Luxury gift box of golden Muscat dates, 500gm.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '500gm', price: 649, stock: 20 },
    ],
  },
  {
    name: '250gm Muscat Box',
    category: 'Dates',
    description: 'Compact luxury box of Muscat dates, 250gm. Premium gift.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '250gm', price: 399, stock: 25 },
    ],
  },
  {
    name: 'Khenaizi Dates',
    category: 'Dates',
    description: 'Traditional Khenaizi dates with rich heritage flavor. Premium quality.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '250gm', price: 299, stock: 30 },
      { weight: '500gm', price: 549, stock: 25 },
    ],
  },
  {
    name: 'Safawi Dates',
    category: 'Dates',
    description: 'Premium Safawi dates, dark and delicious. Rich in minerals.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '250gm', price: 319, stock: 28 },
      { weight: '500gm', price: 579, stock: 24 },
    ],
  },
  {
    name: 'Mabroom Dates',
    category: 'Dates',
    description: 'Chewy Mabroom dates with natural sweetness. Premium texture.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '250gm', price: 289, stock: 32 },
      { weight: '500gm', price: 529, stock: 28 },
    ],
  },
  {
    name: 'Ajwa Dates',
    category: 'Dates',
    description: 'Sacred Ajwa dates from Medina. Premium quality with unique taste.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '250gm', price: 399, stock: 20 },
      { weight: '500gm', price: 749, stock: 15 },
    ],
  },
  {
    name: 'Dry Dates (Khajoor)',
    category: 'Dates',
    description: 'Traditional dry dates with concentrated flavor. Energy-packed snack.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '250gm', price: 199, stock: 40 },
      { weight: '500gm', price: 379, stock: 35 },
    ],
  },

  // === ALMONDS (2 products) ===
  {
    name: 'Almond Regular',
    category: 'Nuts',
    description: 'Regular almonds, natural and raw. High in protein and healthy fats.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 279, stock: 45 },
      { weight: '500gm', price: 649, stock: 35 },
      { weight: '1kg', price: 1199, stock: 25 },
    ],
  },
  {
    name: 'Almond Bold',
    category: 'Nuts',
    description: 'Bold and premium quality almonds. Extra fresh and crunchy.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 319, stock: 40 },
      { weight: '500gm', price: 749, stock: 30 },
      { weight: '1kg', price: 1399, stock: 20 },
    ],
  },

  // === CASHEWS (5 products) ===
  {
    name: 'Cashew W240',
    category: 'Nuts',
    description: 'Premium cashew W240 grade. Whole pieces, excellent quality.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 399, stock: 35 },
      { weight: '500gm', price: 899, stock: 25 },
    ],
  },
  {
    name: 'Cashew W320',
    category: 'Nuts',
    description: 'Medium cashew W320 grade. Perfect for all uses.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 349, stock: 40 },
      { weight: '500gm', price: 799, stock: 30 },
    ],
  },
  {
    name: 'Cashew SW320',
    category: 'Nuts',
    description: 'Split White Cashew SW320. Premium grade with excellent taste.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 329, stock: 38 },
      { weight: '500gm', price: 749, stock: 28 },
    ],
  },
  {
    name: 'Cashew 1/2 Split',
    category: 'Nuts',
    description: 'Cashew halves, perfect for cooking and snacking.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 299, stock: 42 },
      { weight: '500gm', price: 699, stock: 32 },
    ],
  },
  {
    name: 'Cashew 1/4 LWP',
    category: 'Nuts',
    description: 'Cashew quarter pieces, Large White Pieces. Great for recipes.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 279, stock: 44 },
      { weight: '500gm', price: 649, stock: 34 },
    ],
  },
  {
    name: 'Cashew SP',
    category: 'Nuts',
    description: 'Cashew Special grade. Finest quality pieces.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 429, stock: 30 },
      { weight: '500gm', price: 999, stock: 20 },
    ],
  },

  // === RAISINS (3 products) ===
  {
    name: 'Black Seeded Raisins',
    category: 'Raisins',
    description: 'Traditional black raisins with seeds. Rich and sweet flavor.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 149, stock: 50 },
      { weight: '500gm', price: 349, stock: 40 },
      { weight: '1kg', price: 649, stock: 30 },
    ],
  },
  {
    name: 'Kishmish 1',
    category: 'Raisins',
    description: 'Premium Kishmish Grade 1 raisins. Seedless and soft.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 179, stock: 48 },
      { weight: '500gm', price: 399, stock: 38 },
      { weight: '1kg', price: 749, stock: 28 },
    ],
  },
  {
    name: 'Kishmish 2',
    category: 'Raisins',
    description: 'Quality Kishmish Grade 2 raisins. Good taste and value.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 159, stock: 50 },
      { weight: '500gm', price: 369, stock: 40 },
      { weight: '1kg', price: 699, stock: 30 },
    ],
  },

  // === WALNUTS (2 products) ===
  {
    name: 'Walnut',
    category: 'Nuts',
    description: 'Premium whole walnuts. Rich in Omega-3, fresh and crunchy.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 299, stock: 40 },
      { weight: '500gm', price: 699, stock: 30 },
      { weight: '1kg', price: 1299, stock: 20 },
    ],
  },
  {
    name: 'Chilli Walnut',
    category: 'Nuts',
    description: 'Spicy roasted walnuts with chilli flavor. Tasty snack.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 249, stock: 35 },
      { weight: '500gm', price: 579, stock: 28 },
    ],
  },

  // === PISTACHIOS (2 products) ===
  {
    name: 'Green Pistachios',
    category: 'Nuts',
    description: 'Fresh green pistachios, natural and raw. Premium quality.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 399, stock: 30 },
      { weight: '500gm', price: 899, stock: 20 },
      { weight: '1kg', price: 1699, stock: 15 },
    ],
  },
  {
    name: 'Salted Pistachios',
    category: 'Nuts',
    description: 'Roasted and salted pistachios. Perfect party snack.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 379, stock: 32 },
      { weight: '500gm', price: 849, stock: 22 },
    ],
  },

  // === SEEDS (8 products) ===
  {
    name: 'Pumpkin Seed',
    category: 'Seeds',
    description: 'Nutritious pumpkin seeds. Rich in minerals and antioxidants.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 149, stock: 50 },
      { weight: '500gm', price: 349, stock: 40 },
    ],
  },
  {
    name: 'Flax Seed',
    category: 'Seeds',
    description: 'Premium flax seeds. Great for health and nutrition.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 129, stock: 55 },
      { weight: '500gm', price: 299, stock: 45 },
    ],
  },
  {
    name: 'Sunflower Seeds',
    category: 'Seeds',
    description: 'Natural sunflower seeds. Full of healthy fats and vitamins.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 139, stock: 52 },
      { weight: '500gm', price: 319, stock: 42 },
    ],
  },
  {
    name: 'Watermelon Seeds',
    category: 'Seeds',
    description: 'Dried watermelon seeds. Crunchy and nutritious.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 119, stock: 50 },
      { weight: '500gm', price: 279, stock: 40 },
    ],
  },
  {
    name: 'Cucumber Seeds',
    category: 'Seeds',
    description: 'Premium cucumber seeds. Healthy and fresh.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 139, stock: 48 },
      { weight: '500gm', price: 329, stock: 38 },
    ],
  },
  {
    name: 'Sabja Seeds',
    category: 'Seeds',
    description: 'Sabja seeds for beverages and desserts. Hydrating and cool.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '100gm', price: 99, stock: 60 },
      { weight: '250gm', price: 229, stock: 50 },
    ],
  },
  {
    name: 'Chia Seeds',
    category: 'Seeds',
    description: 'Organic chia seeds. Superfood with complete proteins.',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd23a90?w=500&h=500&fit=crop',
    variants: [
      { weight: '200gm', price: 199, stock: 45 },
      { weight: '500gm', price: 449, stock: 35 },
    ],
  },
  {
    name: 'Badam Pisin (Gum)',
    category: 'Specialty',
    description: 'Badam Pisin - Almond gum. Traditional ingredient for dishes.',
    imageUrl: 'https://images.unsplash.com/photo-1585518419759-93628ca6eda8?w=500&h=500&fit=crop',
    variants: [
      { weight: '50gm', price: 149, stock: 30 },
      { weight: '100gm', price: 279, stock: 25 },
    ],
  },
]

async function insertProducts() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing environment variables:')
    console.error('   - NEXT_PUBLIC_SUPABASE_URL')
    console.error('   - SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  try {
    console.log('🚀 Starting bulk product insertion...')
    console.log(`📦 Total products to insert: ${PRODUCTS.length}`)

    let productsAdded = 0
    let variantsAdded = 0
    let imagesAdded = 0

    for (const product of PRODUCTS) {
      // Insert product
      const { data: insertedProduct, error: productError } = await supabase
        .from('products')
        .insert({
          name: product.name,
          category: product.category,
          description: product.description,
        })
        .select()
        .single()

      if (productError) {
        console.error(`❌ Failed to insert "${product.name}":`, productError.message)
        continue
      }

      productsAdded++
      const productId = insertedProduct.id

      // Insert variants
      if (product.variants && product.variants.length > 0) {
        const { error: variantError } = await supabase
          .from('product_variants')
          .insert(
            product.variants.map((v) => ({
              product_id: productId,
              weight: v.weight,
              price: v.price,
              stock: v.stock,
            }))
          )

        if (variantError) {
          console.error(`⚠️  Failed to insert variants for "${product.name}":`, variantError.message)
        } else {
          variantsAdded += product.variants.length
        }
      }

      // Insert image
      if (product.imageUrl) {
        const { error: imageError } = await supabase.from('product_images').insert({
          product_id: productId,
          image_url: product.imageUrl,
        })

        if (imageError) {
          console.error(`⚠️  Failed to insert image for "${product.name}":`, imageError.message)
        } else {
          imagesAdded++
        }
      }

      console.log(`✅ Added: ${product.name} (${product.variants?.length || 0} variants)`)
    }

    console.log('\n' + '='.repeat(60))
    console.log('✨ Bulk insertion complete!')
    console.log(`   ✅ Products: ${productsAdded}/${PRODUCTS.length}`)
    console.log(`   ✅ Variants: ${variantsAdded}`)
    console.log(`   ✅ Images: ${imagesAdded}/${productsAdded}`)
    console.log('='.repeat(60))
  } catch (error) {
    console.error('🔥 Fatal error:', error)
    process.exit(1)
  }
}

insertProducts()
