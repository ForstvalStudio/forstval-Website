'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setIsHovering(true)
        setCursorText('CLICK')
      } else if (target.classList.contains('cursor-hover')) {
        setIsHovering(true)
        setCursorText('HOVER')
      } else if (target.classList.contains('cursor-view')) {
        setIsHovering(true)
        setCursorText('VIEW')
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.1,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-primary/50 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? "rgba(99, 102, 241, 1)" : "rgba(99, 102, 241, 0.5)",
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.3,
        }}
      />

      {/* Cursor text */}
      {isHovering && cursorText && (
        <motion.div
          className="fixed pointer-events-none z-50 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold"
          animate={{
            x: mousePosition.x + 20,
            y: mousePosition.y - 40,
            opacity: 1,
            scale: 1
          }}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {cursorText}
        </motion.div>
      )}

      {/* Cursor trail particles */}
      <motion.div
        className="fixed w-1 h-1 bg-secondary rounded-full pointer-events-none z-40 opacity-60"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.3,
        }}
      />
      
      <motion.div
        className="fixed w-0.5 h-0.5 bg-accent rounded-full pointer-events-none z-40 opacity-40"
        animate={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.5,
        }}
      />
    </>
  )
}