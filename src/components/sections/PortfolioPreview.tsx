'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Github, Filter, Eye, Sparkles } from 'lucide-react'

// Enhanced portfolio data with more projects and categories
const featuredProjects = [
  {
    id: 1,
    title: 'AI-Powered Content Generator',
    category: 'AI/ML',
    description: 'Advanced neural network for generating high-quality content across multiple domains with real-time processing.',
    image: '/projects/ai-generator.jpg',
    tags: ['Python', 'TensorFlow', 'NLP', 'API', 'Real-time'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { views: '50K+', stars: '2.3K', forks: '450' },
    gradient: 'from-amber-500/20 to-orange-600/20',
    icon: '🤖'
  },
  {
    id: 2,
    title: 'Immersive VR Game Experience',
    category: 'Game Development',
    description: 'Cross-platform VR adventure game with cutting-edge graphics, physics, and multiplayer support.',
    image: '/projects/vr-game.jpg',
    tags: ['Unity', 'C#', 'VR', 'WebGL', 'Multiplayer'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { downloads: '100K+', rating: '4.8★', players: '25K' },
    gradient: 'from-red-500/20 to-pink-600/20',
    icon: '🎮'
  },
  {
    id: 3,
    title: 'Enterprise Resource Planner',
    category: 'Enterprise',
    description: 'Comprehensive ERP system for streamlining business operations with advanced analytics and reporting.',
    image: '/projects/erp-system.jpg',
    tags: ['Next.js', 'PostgreSQL', 'TypeScript', 'Docker', 'Analytics'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { users: '10K+', uptime: '99.9%', processing: '1M+' },
    gradient: 'from-indigo-500/20 to-purple-600/20',
    icon: '🏢'
  },
  {
    id: 4,
    title: 'Smart Mobile Banking App',
    category: 'Mobile',
    description: 'Secure and intuitive mobile banking application with biometric authentication and AI-powered insights.',
    image: '/projects/mobile-banking.jpg',
    tags: ['React Native', 'Node.js', 'Blockchain', 'AI', 'Security'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { downloads: '500K+', security: 'A+', transactions: '5M+' },
    gradient: 'from-green-500/20 to-teal-600/20',
    icon: '📱'
  },
  {
    id: 5,
    title: 'E-Commerce Platform Pro',
    category: 'Web Development',
    description: 'Modern e-commerce platform with AI recommendations, real-time inventory, and global payment processing.',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'Stripe', 'AI', 'Microservices', 'Cloud'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { merchants: '1K+', orders: '50K+', revenue: '$2M+' },
    gradient: 'from-blue-500/20 to-cyan-600/20',
    icon: '🌐'
  },
  {
    id: 6,
    title: 'Custom Automation Suite',
    category: 'Custom Software',
    description: 'Tailored automation solution for manufacturing processes with IoT integration and predictive maintenance.',
    image: '/projects/automation.jpg',
    tags: ['Python', 'IoT', 'Machine Learning', 'Cloud', 'Monitoring'],
    demoUrl: '#',
    githubUrl: '#',
    stats: { efficiency: '+40%', devices: '500+', alerts: '24/7' },
    gradient: 'from-purple-500/20 to-pink-600/20',
    icon: '⚡'
  }
]

const categories = ['All', 'AI/ML', 'Game Development', 'Enterprise', 'Mobile', 'Web Development', 'Custom Software']

export default function PortfolioPreview() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredProjects = activeCategory === 'All' 
    ? featuredProjects.slice(0, 6) // Show first 6 for preview
    : featuredProjects.filter(project => project.category === activeCategory).slice(0, 6)

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <motion.div 
          className="absolute inset-0 bg-tech-pattern opacity-5"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

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
            Our Work Speaks <motion.span 
              className="text-gradient inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Every Language
            </motion.span>
            <motion.div
              className="inline-block ml-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-accent" />
            </motion.div>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From cutting-edge AI solutions to immersive gaming experiences, 
            explore our diverse portfolio of successful projects across all tech domains
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.8 + index * 0.1 }
              } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'All' && <Filter className="w-4 h-4" />}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
            key={activeCategory}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${activeCategory}-${project.id}`}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 50, rotateX: 25 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -10,
                  rotateX: -5,
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
                    boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(99, 102, 241, 0.2)",
                  }}
                />

                {/* Project Image/Visual */}
                <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    whileHover={{ opacity: 0.8 }}
                  />
                  
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="px-3 py-1 bg-accent text-dark text-xs font-semibold rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </motion.div>
                  
                  {/* Project Icon */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center text-7xl opacity-40"
                    whileHover={{ scale: 1.2, opacity: 0.6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {project.icon}
                  </motion.div>

                  {/* Hover Action Buttons */}
                  <motion.div 
                    className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className="flex gap-4">
                      <motion.a 
                        href={project.demoUrl}
                        className="p-3 bg-primary rounded-full text-white shadow-lg"
                        whileHover={{ scale: 1.1, backgroundColor: "#5048E5" }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="View Demo"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.a>
                      <motion.a 
                        href={project.githubUrl}
                        className="p-3 bg-gray-700 rounded-full text-white shadow-lg"
                        whileHover={{ scale: 1.1, backgroundColor: "#4B5563" }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="View Source"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </motion.div>

                  {/* Stats Overlay */}
                  <motion.div 
                    className="absolute bottom-4 left-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <div className="flex gap-3 text-xs">
                      {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                          <span className="text-accent">{value}</span> {key}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6 relative z-10">
                  <motion.h3 
                    className="text-xl font-bold mb-2 transition-colors"
                    whileHover={{ color: "#6366F1" }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <motion.span 
                        key={tag} 
                        className="px-3 py-1 bg-gray-800/50 text-xs rounded-full text-gray-300 border border-gray-700/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { delay: index * 0.1 + tagIndex * 0.05 }
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgba(99, 102, 241, 0.1)",
                          borderColor: "rgba(99, 102, 241, 0.3)"
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTA Link */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link 
                      href={`/portfolio/${project.id}`}
                      className="inline-flex items-center text-accent hover:text-primary transition-colors group/link font-semibold"
                    >
                      View Case Study
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link 
              href="/portfolio"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group shadow-xl hover:shadow-2xl hover:shadow-primary/25"
            >
              <span>View Full Portfolio</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.p 
            className="text-gray-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Explore {featuredProjects.length} projects across {categories.length - 1} technology domains
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}