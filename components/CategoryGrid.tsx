import Image from 'next/image'

const categories = [
  {
    slug: 'dates',
    label: 'Majestic Dates',
    sub: 'Browse Selection',
    featured: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiTSm3qJSShcIyA8U_3P6cfBP1iejy8s6MJUdzsySMOvjaMs-NmcmWdPSE72eeXxxoGkkJVEAcp8-7ZXmY2hIMfVYWCBbCXtVWs_GduYtB5HHu2VoPnSO-20UoBWb7gFTvq9lbDMQYXfZm3J7VoEhlXaJfrNAHdFmN8S0YNQxZWv9OU9Q9uhvykoNtuogY0dtokFo6RLc-D5E-AYeZtPEiNMzrTjkoTu-_-TOc1qa9lRj75_QJonttET10swbskltHPYOjZnsNkn8o',
  },
  {
    slug: 'nuts',
    label: 'Artisan Nuts',
    sub: null,
    featured: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBcRdUF3aZpIz7LzMqB71Bjz_ARdilrkIsIvpgBWgTXQH6aNfnwSkMnIj_iwKusP7sZJ98jBAcwUoP32hOPFZ2Uc2VCuKwXL7TPZqEKepT3S09_NmU_0hXF-TJpUURSrZNovLyeGVZsT2_4WW3Jver-oCb4xTua2oAp7eWTNw7GMK8-1u5kaHGVkUYcxccVoeE4KDl82YQUHAxrNziHGLzF5Zv_AmyEISCfIQ_nLBmLi4TVbDaembpOL2XvhsHvmweuBWFOOjP2SXj',
  },
  {
    slug: 'seeds',
    label: 'Heirloom Seeds',
    sub: null,
    featured: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzuALZ1z1H7EufwIMwzfRidm7h8lyiIs9RyO9Qq8i5x1xnbm98HZjPQMGk8W3FZZT-U3CZdeoCXDbGoeEJQC7dYkJEo2WYedsIGuAooDWyldUdFNfbfvjeSZGehYBTfInRX8s7K32GlV6Vk2UTGMZfZHfbuNhLCw4C6bMgJ_OqeyjHlVshc0xHOAwoMAswConufmXTscDDa92A9trnRPRJMGU3O_YAA_ETc0K1X1ZHlwGCcQaNlorhsBeMuYQP1JYIXPX7Nb6eaq1W',
  },
  {
    slug: 'dry-fruits',
    label: 'Orchard Fruits',
    sub: null,
    featured: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwTkpU8ncEJFl1k54M4gUDaYL8jrzr8-x2IbjC8xn0GjRBox6IoSatvSMaxLa-WRc8sxmgiWXkC-a71RnI6uX_IWx8y55sH_F6wD9tXYau6_27mjc9ThkCiMAnkm1zREeitWSS1HK5TiCp6eNQyBMupmPKRwzQDyOHUXM5HLWCTfHq5CB0YnUhSiHBFtReM58Hlw7s8xxp3n9u94cbSO_igg9hYaa5n5K8dFOh6h0lqJ65VTIbF-RWlTvEOTchhHYaAdBoQ9M5R63J',
  },
]

export default function CategoryGrid() {
  const [featured, ...rest] = categories

  return (
    <section className="py-24 bg-[#f6f3f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span
              className="text-[#775a19] font-semibold uppercase tracking-[0.22em] text-[11px] mb-2 block"
            >
              Curated Collections
            </span>
            <h2
              className="text-[36px] md:text-[42px] font-bold tracking-tight text-[#1b1c1c]"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              The Agrarian Pantry
            </h2>
          </div>
          <a
            href="/products"
            className="text-[13px] font-semibold text-[#74554b] flex items-center gap-1.5 hover:gap-3 transition-all duration-200 whitespace-nowrap"
          >
            View all categories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" style={{ minHeight: undefined }}>
          {/* Featured large card */}
          <a
            href={`/products?category=${featured.slug}`}
            className="sm:col-span-2 md:col-span-2 relative group overflow-hidden rounded-2xl bg-[#e5e2e1] block min-h-[280px] md:min-h-[360px]"
          >
            <Image
              src={featured.imageUrl}
              alt={featured.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
              <h3
                className="text-white text-[22px] sm:text-[28px] font-bold mb-2 tracking-tight"
                style={{ fontFamily: 'Epilogue, sans-serif' }}
              >
                {featured.label}
              </h3>
              <span className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-[13px] font-semibold">
                Browse Selection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </a>

          {/* Smaller cards */}
          {rest.map((cat, i) => (
            <a
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`relative group overflow-hidden rounded-2xl bg-[#e5e2e1] block min-h-[160px] sm:min-h-[180px] ${
                i === 0 ? 'sm:col-span-2 md:col-span-2' : ''
              }`}
            >
              <Image
                src={cat.imageUrl}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6">
                <h3
                  className={`text-white font-bold tracking-tight ${i === 0 ? 'text-[22px]' : 'text-[18px]'}`}
                  style={{ fontFamily: 'Epilogue, sans-serif' }}
                >
                  {cat.label}
                </h3>
              </div>
              {/* Hover arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
