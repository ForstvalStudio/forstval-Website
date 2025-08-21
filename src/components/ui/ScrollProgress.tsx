'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = 
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100

      setScrollProgress(scrolled)
      setIsVisible(scrollPx > 100)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg flex items-center justify-center z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0,
          rotate: scrollProgress * 3.6 // Full rotation at 100%
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.div>
      </motion.button>

      {/* Progress Circle */}
      <motion.div
        className="fixed bottom-24 right-8 w-16 h-16 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: scrollProgress / 100 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xs font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
          >
            {Math.round(scrollProgress)}%
          </motion.span>
        </div>
      </motion.div>
    </>
  )
}