import { motion } from 'framer-motion'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'pink'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
}

export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: GlowButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none overflow-hidden'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary: 'glow-btn text-white',
    secondary: 'glass border border-white/10 text-brand-primary hover:border-accent-purple/40 hover:bg-white/8',
    ghost: 'text-brand-secondary hover:text-brand-primary hover:bg-bg-overlay',
    pink: 'bg-gradient-to-r from-pink-500 to-accent-pink text-white hover:shadow-glow-pink',
  }

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        icon && <span className="w-4 h-4">{icon}</span>
      )}
      {children}
    </motion.button>
  )
}
