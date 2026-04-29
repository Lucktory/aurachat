import { motion } from 'framer-motion'
import { X, Star, MessageCircle, Crown, Gem, Heart, Users, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Character } from '@/types'
import { useStore } from '@/store/useStore'
import { getRelationshipLevel } from '@/utils/relationship'

interface Props {
  character: Character
  onClose: () => void
}

const relIcons: Record<string, LucideIcon> = { Gem, Heart, Users, User }

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)
}

const dots = ['Desconhecida', 'Conhecida', 'Amiga', 'Especial', 'Alma Gêmea']

export default function CharacterProfileModal({ character, onClose }: Props) {
  const { setSelectedCharacter, setCurrentPage, conversations } = useStore()

  const conv = conversations.get(`conv_${character.id}`)
  const msgCount = conv?.messages.filter((m) => !m.deleted).length ?? 0
  const rel = getRelationshipLevel(msgCount)
  const RelIcon = relIcons[rel.icon] ?? User

  const handleChat = () => {
    setSelectedCharacter(character)
    setCurrentPage('chat')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
      style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{ background: '#100D18', maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Cover photo */}
        <div className="relative h-56 flex-shrink-0">
          <img
            src={character.coverUrl || character.avatarUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100D18] via-[#100D18]/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>

          {character.isPremium && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2.5 py-1">
              <Crown size={10} className="text-yellow-400" />
              <span className="text-[10px] text-yellow-300 font-bold">Premium</span>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-11 relative z-10 mb-2">
          <div className="relative">
            <div
              className="p-0.5 rounded-full"
              style={{ background: `linear-gradient(135deg, ${rel.color}, #EC4899)` }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden ring-3 ring-[#100D18]">
                <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
              </div>
            </div>
            {character.isOnline && (
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-green-400 ring-2 ring-[#100D18]" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-7 flex flex-col gap-4">

          {/* Name */}
          <div className="text-center">
            <h2 className="font-display font-bold text-xl text-brand-primary">{character.name}</h2>
            <p className="text-brand-secondary text-sm mt-0.5">{character.shortBio}</p>
            <p className="text-xs text-brand-muted mt-1.5 leading-relaxed max-w-xs mx-auto">{character.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {character.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-bg-overlay rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star size={11} className="text-yellow-400" fill="currentColor" />
                <span className="text-brand-primary font-bold text-sm">{character.rating}</span>
              </div>
              <p className="text-[10px] text-brand-muted">Avaliação</p>
            </div>
            <div className="bg-bg-overlay rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <MessageCircle size={11} className="text-accent-purple" />
                <span className="text-brand-primary font-bold text-sm">{fmt(character.messageCount)}</span>
              </div>
              <p className="text-[10px] text-brand-muted">Mensagens</p>
            </div>
            <div className="bg-bg-overlay rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <RelIcon size={11} style={{ color: rel.color }} />
                <span className="font-bold text-sm" style={{ color: rel.color }}>
                  {rel.level + 1}/5
                </span>
              </div>
              <p className="text-[10px] text-brand-muted">Nível</p>
            </div>
          </div>

          {/* Relationship level */}
          <div className="bg-bg-overlay rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <RelIcon size={13} style={{ color: rel.color }} />
                <span className="text-xs font-semibold" style={{ color: rel.color }}>{rel.label}</span>
              </div>
              {rel.nextAt !== null && (
                <span className="text-[10px] text-brand-muted">
                  {rel.nextAt - msgCount} msgs → próximo nível
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rel.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${rel.color}, #EC4899)` }}
              />
            </div>

            {/* Level dots */}
            <div className="flex justify-between mt-2">
              {dots.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-0.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ background: i <= rel.level ? rel.color : '#374151' }}
                  />
                  <span
                    className="text-[8px] font-medium hidden sm:block"
                    style={{ color: i <= rel.level ? rel.color : '#4B5563' }}
                  >
                    {d.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleChat}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm glow-btn flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Conversar com {character.name}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
