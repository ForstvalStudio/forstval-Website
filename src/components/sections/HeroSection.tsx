'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HERO_SERVICES } from '@/lib/constants'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % HERO_SERVICES.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary/10 to-secondary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            initial={{ 
              x: Math.random() * 1000 + 100,
              y: Math.random() * 600 + 100,
              scale: 0,
              rotate: 0
            }}
            animate={{ 
              x: Math.random() * 1000 + 200,
              y: Math.random() * 600 + 200,
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            {['💻', '🎮', '🤖', '📱', '⚡', '🚀', '💡', '⚙️'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Heading */}
          <motion.h1 
            className="text-6xl md:text-8xl font-heading font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span 
              className="text-gradient inline-block"
              whileHover={{ 
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              ForstvalStudio
            </motion.span>
          </motion.h1>

          {/* Dynamic Tagline */}
          <motion.div 
            className="text-2xl md:text-4xl mb-8 h-12 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-gray-300">We're </span>
            <motion.span 
              className="text-accent font-bold ml-2 inline-block"
              style={{ minWidth: '200px', textAlign: 'left' }}
              key={currentServiceIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {HERO_SERVICES[currentServiceIndex]}
            </motion.span>
            <motion.div
              className="ml-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-accent" />
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            From training cutting-edge LLMs to crafting immersive games, 
            from enterprise solutions to creative web experiences — 
            <motion.span 
              className="text-primary font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {" "}every tech challenge finds its solution here.
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link 
                href="/contact"
                className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-primary/25 transition-shadow"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link 
                href="/portfolio"
                className="group px-8 py-4 border-2 border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Explore Our Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats/Features */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "6", label: "Tech Specialties" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.0 + (index * 0.1),
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-gradient mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
          whileHover={{ scale: 1.2, borderColor: "rgba(255, 255, 255, 0.6)" }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ 
              y: [0, 6, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}