import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const EMOJIS = [
  '😀','😂','🥰','😍','🤩','😘','😊','🥺','😢','😭',
  '😤','😠','🤯','🥳','😎','🤔','😏','🙄','😴','🤗',
  '👋','👍','👎','❤️','🔥','✨','🎉','💯','🙏','💪',
  '😋','🤭','😅','😆','🫠','🥹','😇','🤣','😌','😔',
  '💋','💕','💖','💘','💌','🫶','🥀','🌸','🌹','🦋',
  '🎵','🎶','☕','🍷','🍓','🍑','🌙','⭐','🌈','💎',
]

interface Props {
  onSelect: (emoji: string) => void
  onClose: () => void
}

export default function EmojiPicker({ onSelect, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-full left-0 mb-2 z-50 rounded-2xl border border-white/10 p-3 shadow-2xl"
      style={{ background: '#1A1526', width: 272 }}
    >
      <div className="grid grid-cols-10 gap-0.5">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="w-[26px] h-[26px] flex items-center justify-center text-lg rounded-lg hover:bg-white/10 transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
