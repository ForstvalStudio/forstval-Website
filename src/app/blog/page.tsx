import { BLOG_CATEGORIES } from '@/lib/constants'

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest tech insights, project updates, and 
            industry trends from our team.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {BLOG_CATEGORIES.map(category => (
            <button
              key={category.id}
              className="px-6 py-2 glass rounded-full transition-all hover:scale-110"
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">Blog Coming Soon</h3>
          <p className="text-gray-400">
            We're preparing engaging content about technology, tutorials, and project insights.
          </p>
        </div>
      </div>
    </div>
  )
}