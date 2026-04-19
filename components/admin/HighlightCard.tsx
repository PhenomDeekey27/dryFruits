type Props = {
  title?: string
  subtitle?: string
  imageUrl?: string
}

export default function HighlightCard({
  title = 'The Autumn Collection is performing 40% above targets.',
  subtitle = 'CURATOR SPOTLIGHT',
  imageUrl = 'https://images.unsplash.com/photo-1574570068036-e36cbfffc5e5?w=600&q=80',
}: Props) {
  return (
    <div
      className="relative rounded-xl overflow-hidden h-[160px] animate-fade-in stagger-5"
      style={{ boxShadow: '0 1px 8px rgba(61,35,20,0.07)' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a04cc] via-[#3d231480] to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[9px] font-700 text-[#d4a574] uppercase tracking-widest mb-1.5" style={{ fontWeight: 700 }}>
          {subtitle}
        </p>
        <p className="text-[13px] font-700 text-white leading-snug" style={{ fontWeight: 700 }}>
          {title}
        </p>
      </div>
    </div>
  )
}
