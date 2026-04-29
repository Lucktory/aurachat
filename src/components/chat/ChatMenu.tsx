import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical, Trash2, ShieldOff, ChevronRight } from 'lucide-react'
import type { Character } from '@/types'

interface ChatMenuProps {
  character: Character
  onClearChat: () => void
  onRequestBlock: () => void
}

export default function ChatMenu({ character, onClearChat, onRequestBlock }: ChatMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-brand-muted hover:text-brand-secondary hover:bg-bg-hover transition-colors"
      >
        <MoreVertical size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 w-52 rounded-2xl border border-white/8 shadow-card-hover z-40 overflow-hidden"
            style={{ background: 'rgba(26,21,38,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <button
              onClick={() => { onClearChat(); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brand-secondary hover:text-brand-primary hover:bg-white/5 transition-colors"
            >
              <Trash2 size={15} className="text-brand-muted" />
              Limpar conversa
            </button>

            <div className="h-px bg-white/5 mx-3" />

            <button
              onClick={() => { onRequestBlock(); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-colors"
            >
              <ShieldOff size={15} />
              Bloquear {character.name}
              <ChevronRight size={13} className="ml-auto opacity-50" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
