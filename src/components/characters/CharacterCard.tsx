import { motion } from 'framer-motion'
import { MessageCircle, Star, Crown, Zap } from 'lucide-react'
import type { Character } from '@/types'

interface CharacterCardProps {
  character: Character
  onClick: () => void
  isActive?: boolean
  variant?: 'grid' | 'list'
}

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

export default function CharacterCard({ character, onClick, isActive = false, variant = 'grid' }: CharacterCardProps) {

  /* ── LIST variant (sidebar) ── */
  if (variant === 'list') {
    return (
      <motion.div
        whileHover={{ x: 4, backgroundColor: 'rgba(168,85,247,0.06)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
          isActive ? 'bg-accent-purple/10 border border-accent-purple/20' : 'hover:bg-bg-hover'
        }`}
      >
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/10">
            <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
          </div>
          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg-surface ${
            character.isOnline ? 'bg-green-400 animate-pulse-slow' : 'bg-brand-muted'
          }`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-brand-primary truncate">{character.name}</span>
            {character.isPremium && <Crown size={12} className="text-yellow-400 flex-shrink-0" />}
          </div>
          <p className="text-xs text-brand-secondary truncate">{character.shortBio}</p>
        </div>

        {isActive && <div className="w-2 h-2 rounded-full bg-accent-purple flex-shrink-0" />}
      </motion.div>
    )
  }

  /* ── GRID variant (landing page) — full-photo card ── */
  const photo = character.coverUrl || character.avatarUrl

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      whileHover={{ rotateY: 3, rotateX: -2, scale: 1.02, boxShadow: '0 0 40px rgba(168,85,247,0.40), 0 24px 60px rgba(0,0,0,0.7)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={onClick}
    >
      {/* Full-height photo */}
      <div className="relative h-72 overflow-hidden bg-bg-overlay">
        <img
          src={photo}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay — bottom fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {character.isPremium ? (
            <div className="flex items-center gap-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2 py-0.5 backdrop-blur-sm">
              <Crown size={10} className="text-yellow-400" />
              <span className="text-[10px] text-yellow-400 font-semibold">Premium</span>
            </div>
          ) : <div />}

          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
            <span className={`w-1.5 h-1.5 rounded-full ${character.isOnline ? 'bg-green-400 animate-pulse' : 'bg-brand-muted'}`} />
            <span className="text-[10px] text-brand-secondary">{character.isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>

        {/* Bottom info overlay on photo */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display font-bold text-white text-xl mb-1">{character.name}</h3>
          <p className="text-white/70 text-xs leading-relaxed line-clamp-2 mb-2">{character.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {character.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats + CTA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-white/60 text-xs">
              <MessageCircle size={11} />
              <span>{formatCount(character.messageCount)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star size={11} className="text-yellow-400" fill="currentColor" />
              <span className="text-white/80">{character.rating}</span>
            </div>
            <motion.button
              className="ml-auto flex items-center gap-1.5 glow-btn text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Zap size={12} />
              Conversar
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
