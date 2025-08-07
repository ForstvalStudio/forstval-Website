import Link from 'next/link'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'

// Mock portfolio data - this would come from your CMS/database in production
const featuredProjects = [
  {
    id: 1,
    title: 'AI-Powered Content Generator',
    category: 'AI/ML',
    description: 'Advanced neural network for generating high-quality content across multiple domains.',
    image: '/projects/ai-generator.jpg',
    tags: ['Python', 'TensorFlow', 'NLP', 'API'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Immersive VR Game Experience',
    category: 'Game Development',
    description: 'Cross-platform VR adventure game with cutting-edge graphics and physics.',
    image: '/projects/vr-game.jpg',
    tags: ['Unity', 'C#', 'VR', 'WebGL'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Enterprise Resource Planner',
    category: 'Enterprise',
    description: 'Comprehensive ERP system for streamlining business operations and analytics.',
    image: '/projects/erp-system.jpg',
    tags: ['Next.js', 'PostgreSQL', 'TypeScript', 'Docker'],
    demoUrl: '#',
    githubUrl: '#',
  },
]

export default function PortfolioPreview() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Our Work Speaks <span className="text-gradient">Every Language</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From cutting-edge AI solutions to immersive gaming experiences, 
            explore our diverse portfolio of successful projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent text-dark text-xs font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
                
                {/* Placeholder for actual project image */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                  {project.category === 'AI/ML' ? '🤖' : 
                   project.category === 'Game Development' ? '🎮' : '🏢'}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <a 
                      href={project.demoUrl}
                      className="p-3 bg-primary rounded-full hover:bg-primary/80 transition-colors"
                      aria-label="View Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.githubUrl}
                      className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                      aria-label="View Source"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-800 text-xs rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/portfolio/${project.id}`}
                  className="inline-flex items-center text-accent hover:text-primary transition-colors group/link"
                >
                  View Case Study
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/portfolio"
            className="btn-primary text-lg px-8 py-4"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}