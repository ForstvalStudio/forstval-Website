'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SERVICES } from '@/lib/constants'
import { ArrowRight, Zap, Code, Gamepad2, Building, Smartphone, Wrench } from 'lucide-react'

export default function ServicesPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const serviceIcons = [Zap, Code, Gamepad2, Building, Smartphone, Wrench]

  return (
    <section className="py-20 bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-tech-pattern opacity-10" />
      
      <div className="container-custom relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-heading font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every Tech Dream <motion.span 
              className="text-gradient"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Welcome Here
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            No matter your industry or challenge, we have the expertise to bring your vision to life
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = serviceIcons[index] || Wrench
            
            return (
              <motion.div
                key={service.id}
                className="group relative rounded-2xl p-8 cursor-pointer"
                initial={{ opacity: 0, y: 50, rotateY: 25 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }
                } : {}}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* 3D Glass Card Background */}
                <motion.div 
                  className="absolute inset-0 glass rounded-2xl"
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(99, 102, 241, 0.2)",
                  }}
                />
                
                {/* Gradient Border Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 rounded-2xl blur-xl`}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  {/* Icon and Emoji */}
                  <div className="flex items-center mb-4">
                    <motion.div 
                      className="text-5xl mr-3"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {service.icon}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: -10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <IconComponent className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    className="text-2xl font-bold mb-3 transition-colors"
                    whileHover={{ color: "#6366F1" }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="text-gray-400 mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.projects.slice(0, 3).map((project, projIndex) => (
                      <motion.div 
                        key={project} 
                        className="flex items-center text-sm text-gray-500"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 + projIndex * 0.05 }
                        } : {}}
                      >
                        <motion.span 
                          className="w-2 h-2 bg-accent rounded-full mr-2 flex-shrink-0"
                          whileHover={{ scale: 1.5, backgroundColor: "#6366F1" }}
                        />
                        {project}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link 
                      href={`/services#${service.id}`}
                      className="inline-flex items-center text-accent hover:text-primary transition-colors group/link"
                    >
                      Learn more 
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link 
              href="/services"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
            >
              View All Services
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}