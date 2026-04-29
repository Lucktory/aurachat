import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface GlassmorphCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  tilt?: boolean
  glow?: boolean
  onClick?: () => void
}

export default function GlassmorphCard({
  children,
  className = '',
  hover = true,
  tilt = false,
  glow = false,
  onClick,
}: GlassmorphCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl ${glow ? 'shadow-glow-sm' : 'shadow-card'} ${
        hover ? 'cursor-pointer' : ''
      } ${className}`}
      whileHover={
        tilt
          ? { rotateY: 4, rotateX: -4, scale: 1.02, boxShadow: '0 0 40px rgba(168,85,247,0.40)' }
          : hover
          ? { y: -2, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={tilt ? { transformStyle: 'preserve-3d', perspective: 1000 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
