import Link from 'next/link'
import { ArrowRight, MessageCircle, Mail, Phone } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Ready to Build <span className="text-gradient">Something Amazing?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Let's transform your tech dreams into reality. Whether it's AI/ML, web development, 
            games, or enterprise solutions — we're here to make it happen.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
            {/* Main CTA */}
            <div className="text-center">
              <Link 
                href="/contact"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 mb-4"
              >
                Start Your Project Today
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-sm text-gray-500">
                Free consultation • No commitments • 24h response
              </p>
            </div>

            <div className="text-center text-gray-400">
              <div className="text-lg font-semibold mb-2">or</div>
            </div>

            {/* Alternative Contact Methods */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:business@forststalstudio.com"
                className="flex items-center px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                <span className="text-sm">Email Us</span>
              </a>
              
              <a 
                href="tel:+1234567890"
                className="flex items-center px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                <span className="text-sm">Call Us</span>
              </a>
              
              <a 
                href="#"
                className="flex items-center px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors group"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                <span className="text-sm">Live Chat</span>
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-400 text-sm">
                Rapid prototyping and agile development for quick turnarounds
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-400 text-sm">
                Rigorous testing and code review processes for bulletproof solutions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold mb-2">Long-term Partnership</h3>
              <p className="text-gray-400 text-sm">
                Ongoing support and maintenance to ensure your success
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}