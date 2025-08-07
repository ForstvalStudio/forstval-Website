import { SERVICES } from '@/lib/constants'

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From AI/ML solutions to game development, we provide comprehensive 
            technology services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              
              <div className="space-y-2">
                {service.features.map(feature => (
                  <div key={feature} className="flex items-center text-sm text-gray-300">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}