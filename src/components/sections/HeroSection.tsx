'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { HERO_SERVICES } from '@/lib/constants'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroSection() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const servicesTextRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % HERO_SERVICES.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (servicesTextRef.current) {
      servicesTextRef.current.style.opacity = '0'
      servicesTextRef.current.style.transform = 'translateY(10px)'
      
      setTimeout(() => {
        if (servicesTextRef.current) {
          servicesTextRef.current.textContent = HERO_SERVICES[currentServiceIndex]
          servicesTextRef.current.style.opacity = '1'
          servicesTextRef.current.style.transform = 'translateY(0)'
        }
      }, 200)
    }
  }, [currentServiceIndex])

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
          <div
            key={i}
            className={`absolute text-2xl opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {['💻', '🎮', '🤖', '📱', '⚡', '🚀', '💡', '⚙️'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 animate-slide-up">
            <span className="text-gradient">ForstvalStudio</span>
          </h1>

          {/* Dynamic Tagline */}
          <div className="text-2xl md:text-4xl mb-8 h-12 flex items-center justify-center">
            <span className="text-gray-300">We're </span>
            <span 
              ref={servicesTextRef}
              className="text-accent font-bold ml-2 transition-all duration-500 inline-block"
              style={{ minWidth: '200px', textAlign: 'left' }}
            >
              Building Tomorrow
            </span>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 animate-slide-up">
            From training cutting-edge LLMs to crafting immersive games, 
            from enterprise solutions to creative web experiences — 
            <span className="text-primary font-semibold"> every tech challenge finds its solution here.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Link 
              href="/contact"
              className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 flex items-center gap-2"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/portfolio"
              className="group px-8 py-4 border-2 border-white/20 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Explore Our Work
            </Link>
          </div>

          {/* Stats/Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">50+</div>
              <div className="text-gray-400 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">6</div>
              <div className="text-gray-400 text-sm">Tech Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}