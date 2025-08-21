'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, MessageCircle, Mail, Phone, Sparkles, Zap, Shield, Users } from 'lucide-react'

export default function CallToAction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const trustIndicators = [
    { icon: Zap, title: "Fast Delivery", description: "Rapid prototyping and agile development for quick turnarounds", gradient: "from-amber-500 to-orange-500" },
    { icon: Shield, title: "Quality Assured", description: "Rigorous testing and code review processes for bulletproof solutions", gradient: "from-blue-500 to-purple-500" },
    { icon: Users, title: "Long-term Partnership", description: "Ongoing support and maintenance to ensure your success", gradient: "from-green-500 to-teal-500" }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            animate={{ 
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container-custom relative" ref={ref}>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-heading font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to Build{" "}
            <motion.span 
              className="text-gradient inline-block relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Something Amazing?
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-accent" />
              </motion.div>
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's transform your tech dreams into reality. Whether it's AI/ML, web development, 
            games, or enterprise solutions — we're here to make it happen.
          </motion.p>

          <motion.div 
            className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Main CTA */}
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href="/contact"
                  className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all mb-4"
                >
                  <span>Start Your Project Today</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.p 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Free consultation • No commitments • 24h response
              </motion.p>
            </motion.div>

            <motion.div 
              className="text-center text-gray-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-lg font-semibold mb-2">or</div>
            </motion.div>

            {/* Enhanced Contact Methods */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { href: "mailto:business@forststalstudio.com", icon: Mail, label: "Email Us", color: "text-blue-400" },
                { href: "tel:+1234567890", icon: Phone, label: "Call Us", color: "text-green-400" },
                { href: "#", icon: MessageCircle, label: "Live Chat", color: "text-purple-400" }
              ].map((contact, index) => (
                <motion.a 
                  key={index}
                  href={contact.href}
                  className="flex items-center px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all group"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.8 + index * 0.1 }
                  } : {}}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <contact.icon className={`w-5 h-5 mr-2 ${contact.color} transition-colors`} />
                  </motion.div>
                  <span className="text-sm">{contact.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div 
                key={index}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    delay: 1.2 + index * 0.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }
                } : {}}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${indicator.gradient} rounded-full flex items-center justify-center mx-auto mb-4 relative`}
                  animate={hoveredCard === index ? { 
                    scale: 1.1,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                  } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    animate={hoveredCard === index ? { 
                      rotate: 360,
                      scale: 1.2 
                    } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <indicator.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Pulse Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${indicator.gradient} rounded-full opacity-30`}
                    animate={hoveredCard === index ? { 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.1, 0.3]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.h3 
                  className="font-bold mb-2 text-lg"
                  animate={hoveredCard === index ? { color: "#6366F1" } : { color: "#FFFFFF" }}
                  transition={{ duration: 0.3 }}
                >
                  {indicator.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-400 text-sm leading-relaxed"
                  animate={hoveredCard === index ? { 
                    color: "#D1D5DB",
                    scale: 1.02 
                  } : { 
                    color: "#9CA3AF",
                    scale: 1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {indicator.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}