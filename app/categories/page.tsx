import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    slug: 'dates',
    label: 'Majestic Dates',
    description: 'Soft, naturally sweet dates sourced from the finest farms — Medjool, Kalmi, Piarom and more.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiTSm3qJSShcIyA8U_3P6cfBP1iejy8s6MJUdzsySMOvjaMs-NmcmWdPSE72eeXxxoGkkJVEAcp8-7ZXmY2hIMfVYWCBbCXtVWs_GduYtB5HHu2VoPnSO-20UoBWb7gFTvq9lbDMQYXfZm3J7VoEhlXaJfrNAHdFmN8S0YNQxZWv9OU9Q9uhvykoNtuogY0dtokFo6RLc-D5E-AYeZtPEiNMzrTjkoTu-_-TOc1qa9lRj75_QJonttET10swbskltHPYOjZnsNkn8o',
  },
  {
    slug: 'nuts',
    label: 'Artisan Nuts',
    description: 'Hand-selected cashews, almonds, pistachios and walnuts — roasted or raw, perfectly fresh.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBcRdUF3aZpIz7LzMqB71Bjz_ARdilrkIsIvpgBWgTXQH6aNfnwSkMnIj_iwKusP7sZJ98jBAcwUoP32hOPFZ2Uc2VCuKwXL7TPZqEKepT3S09_NmU_0hXF-TJpUURSrZNovLyeGVZsT2_4WW3Jver-oCb4xTua2oAp7eWTNw7GMK8-1u5kaHGVkUYcxccVoeE4KDl82YQUHAxrNziHGLzF5Zv_AmyEISCfIQ_nLBmLi4TVbDaembpOL2XvhsHvmweuBWFOOjP2SXj',
  },
  {
    slug: 'seeds',
    label: 'Heirloom Seeds',
    description: 'Nutrient-dense chia, flax, pumpkin and sunflower seeds — ideal for health-conscious lifestyles.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzuALZ1z1H7EufwIMwzfRidm7h8lyiIs9RyO9Qq8i5x1xnbm98HZjPQMGk8W3FZZT-U3CZdeoCXDbGoeEJQC7dYkJEo2WYedsIGuAooDWyldUdFNfbfvjeSZGehYBTfInRX8s7K32GlV6Vk2UTGMZfZHfbuNhLCw4C6bMgJ_OqeyjHlVshc0xHOAwoMAswConufmXTscDDa92A9trnRPRJMGU3O_YAA_ETc0K1X1ZHlwGCcQaNlorhsBeMuYQP1JYIXPX7Nb6eaq1W',
  },
  {
    slug: 'dry-fruits',
    label: 'Orchard Fruits',
    description: 'Sun-dried apricots, figs, raisins and berries — naturally preserved with intense flavour.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwTkpU8ncEJFl1k54M4gUDaYL8jrzr8-x2IbjC8xn0GjRBox6IoSatvSMaxLa-WRc8sxmgiWXkC-a71RnI6uX_IWx8y55sH_F6wD9tXYau6_27mjc9ThkCiMAnkm1zREeitWSS1HK5TiCp6eNQyBMupmPKRwzQDyOHUXM5HLWCTfHq5CB0YnUhSiHBFtReM58Hlw7s8xxp3n9u94cbSO_igg9hYaa5n5K8dFOh6h0lqJ65VTIbF-RWlTvEOTchhHYaAdBoQ9M5R63J',
  },
]

export default function CategoriesPage() {
  return (
    <>
      <header className="relative pt-20 h-56 flex items-center justify-center bg-[#f6f3f2] overflow-hidden">
        <div className="text-center z-10 px-4">
          <span className="text-[#775a19] font-semibold tracking-[0.2em] text-xs uppercase block mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Browse by Type
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            Categories
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-sm md:text-base font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#3d2314' }}>
            Explore our curated range — from premium dates to artisan nuts, seeds, and orchard fruits.
          </p>
        </div>
        <div className="absolute inset-0 opacity-[0.04] bg-gradient-to-br from-[#74554b] to-[#8f6d63] pointer-events-none" />
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-[#e5e2e1] block ${
                i === 0 ? 'sm:col-span-2 min-h-[340px]' : 'min-h-[260px]'
              }`}
            >
              <Image
                src={cat.imageUrl}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                sizes={i === 0 ? '100vw' : '(max-width: 640px) 100vw, 50vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/75 via-[#1b1c1c]/20 to-transparent" />
              <div className={`absolute bottom-0 left-0 right-0 p-8 ${i === 0 ? 'md:max-w-lg' : ''}`}>
                <h2
                  className={`text-white font-bold tracking-tight mb-2 ${i === 0 ? 'text-[32px] md:text-[38px]' : 'text-[24px]'}`}
                  style={{ fontFamily: 'Epilogue, sans-serif' }}
                >
                  {cat.label}
                </h2>
                <p className="text-white/75 text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors">
                  Shop {cat.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </div>
              <div className="absolute top-5 left-6">
                <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  {cat.slug.replace('-', ' ')}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#827470] text-sm mb-4">Want to browse everything?</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white font-bold rounded-xl hover:shadow-lg hover:opacity-95 transition-all text-[15px]"
          >
            View All Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </main>
    </>
  )
}
