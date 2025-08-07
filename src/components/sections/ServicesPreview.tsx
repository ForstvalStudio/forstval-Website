import Link from 'next/link'
import { SERVICES } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Every Tech Dream <span className="text-gradient">Welcome Here</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            No matter your industry or challenge, we have the expertise to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="group relative glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:bg-white/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`} />
              
              <div className="relative">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.projects.slice(0, 3).map(project => (
                    <div key={project} className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 bg-accent rounded-full mr-2 flex-shrink-0" />
                      {project}
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/services#${service.id}`}
                  className="inline-flex items-center text-accent hover:text-primary transition-colors group/link"
                >
                  Learn more 
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/services"
            className="btn-primary text-lg px-8 py-4"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}