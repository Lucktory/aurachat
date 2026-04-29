import { motion } from 'framer-motion'
import Avatar from '@/components/ui/Avatar'
import type { Character } from '@/types'

interface TypingIndicatorProps {
  character: Character
}

export default function TypingIndicator({ character }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="flex items-end gap-2.5 max-w-[80%]"
    >
      <Avatar src={character.avatarUrl} name={character.name} size="sm" />

      <div className="msg-bubble-ai px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent-purple/70"
            animate={{ y: [0, -7, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        <span className="ml-1 text-xs text-brand-muted">{character.name} está digitando...</span>
      </div>
    </motion.div>
  )
}
