import { PROJECT_TYPES, BUDGET_RANGES } from '@/lib/constants'

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can bring 
            your tech dreams to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Build Something Amazing</h2>
              <p className="text-gray-300 mb-8">
                Whether you need AI/ML solutions, web development, game creation, 
                or enterprise software, we're here to help transform your ideas 
                into reality.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">💼</span>
                  <div>
                    <h3 className="font-semibold">Business Inquiries</h3>
                    <p className="text-gray-400 text-sm">business@forststalstudio.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">💻</span>
                  <div>
                    <h3 className="font-semibold">Technical Support</h3>
                    <p className="text-gray-400 text-sm">support@forststalstudio.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🤝</span>
                  <div>
                    <h3 className="font-semibold">Partnerships</h3>
                    <p className="text-gray-400 text-sm">partners@forststalstudio.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type *</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      required
                    >
                      <option value="">Select a type</option>
                      {PROJECT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    >
                      <option value="">Select budget</option>
                      {BUDGET_RANGES.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Start Your Project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}