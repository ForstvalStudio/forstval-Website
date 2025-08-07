import { PROJECT_CATEGORIES } from '@/lib/constants'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our diverse range of projects spanning multiple technologies 
            and industries.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {PROJECT_CATEGORIES.map(category => (
            <button
              key={category.id}
              className="px-6 py-3 glass rounded-full transition-all duration-300 hover:scale-110"
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-2xl font-bold mb-2">Portfolio Coming Soon</h3>
          <p className="text-gray-400">
            We're currently curating our best projects to showcase here.
          </p>
        </div>
      </div>
    </div>
  )
}