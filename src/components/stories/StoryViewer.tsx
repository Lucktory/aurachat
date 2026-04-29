import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Story, Character } from '@/types'
import { useStore } from '@/store/useStore'

interface Props {
  stories: Story[]
  character: Character
  onClose: () => void
}

export default function StoryViewer({ stories, character, onClose }: Props) {
  const { markStorySeen } = useStore()
  const [idx, setIdx] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const current = stories[idx]

  useEffect(() => {
    if (current) markStorySeen(current.id)
  }, [idx])

  useEffect(() => {
    const t = setTimeout(() => {
      if (idx < stories.length - 1) {
        setIdx((i) => i + 1)
        setAnimKey((k) => k + 1)
      } else {
        onClose()
      }
    }, 5000)
    return () => clearTimeout(t)
  }, [idx, stories.length])

  const prev = useCallback(() => {
    if (idx > 0) { setIdx((i) => i - 1); setAnimKey((k) => k + 1) }
  }, [idx])

  const next = useCallback(() => {
    if (idx < stories.length - 1) { setIdx((i) => i + 1); setAnimKey((k) => k + 1) }
    else onClose()
  }, [idx, stories.length])

  if (!current) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black"
    >
      <div className="relative w-full h-full max-w-sm mx-auto overflow-hidden">

        {/* Story content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            {current.type === 'image' ? (
              <img src={current.content} alt="" className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center px-10"
                style={{ background: current.gradient ?? 'linear-gradient(160deg,#1e1b4b,#4c1d95)' }}
              >
                <p className="text-white text-2xl font-display font-bold text-center leading-relaxed">
                  {current.content}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65 pointer-events-none z-10" />

        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 rounded-full bg-white/25 overflow-hidden">
              {i < idx && <div className="h-full w-full bg-white" />}
              {i === idx && (
                <motion.div
                  key={animKey}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full bg-white"
                />
              )}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-7 left-3 right-3 flex items-center gap-2.5 z-20">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/50 flex-shrink-0">
            <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold leading-none">{character.name}</p>
            {current.caption && (
              <p className="text-white/55 text-xs mt-0.5">{current.caption}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/35 flex items-center justify-center text-white/80 hover:text-white flex-shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* Tap zones */}
        <div className="absolute inset-0 flex z-30">
          <div className="flex-1" onClick={prev} />
          <div className="flex-1" onClick={next} />
        </div>
      </div>
    </motion.div>
  )
}
