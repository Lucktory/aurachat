import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trash2, CheckCheck, Gem, Zap, Smile, Heart, Users, Lightbulb,
  Flower2, Compass, Palette, Crown, MessageCircle,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Gem, Zap, Smile, Heart, Users, Lightbulb, Flower2, Compass, Palette, Crown, MessageCircle,
}
import type { Message, Character } from '@/types'
import Avatar from '@/components/ui/Avatar'
import LockedContent from '@/components/chat/LockedContent'
import ImageLightbox from '@/components/ui/ImageLightbox'
import { useStore } from '@/store/useStore'

interface MessageBubbleProps {
  message: Message
  character: Character
  showAvatar?: boolean
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
}

export default function MessageBubble({ message, character, showAvatar = true }: MessageBubbleProps) {
  const { unlockContent, deleteMessage, activeConversationId } = useStore()
  const [hovered, setHovered] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const isUser = message.role === 'user'

  const handleUnlock = () => {
    if (message.lockedContent && activeConversationId) {
      unlockContent(activeConversationId, message.id, message.lockedContent.previewUrl)
    }
  }

  const handleDelete = () => {
    if (activeConversationId) {
      deleteMessage(activeConversationId, message.id)
    }
  }

  if (message.deleted) {
    return (
      <div className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && <div className="w-8 flex-shrink-0" />}
        <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
          <div className="px-4 py-2.5 rounded-2xl border border-white/8 bg-transparent">
            <p className="text-xs text-brand-muted italic">Mensagem apagada</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar (AI only) */}
      {!isUser && showAvatar ? (
        <Avatar src={character.avatarUrl} name={character.name} size="sm" />
      ) : !isUser ? (
        <div className="w-8 flex-shrink-0" />
      ) : null}

      <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex flex-col gap-1 max-w-[72%] ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Locked content */}
          {!isUser && message.lockedContent && (
            <LockedContent content={message.lockedContent} onUnlock={handleUnlock} />
          )}

          {/* Image attachment */}
          {message.imageUrl && (
            <div
              className={`overflow-hidden rounded-2xl ${isUser ? 'rounded-br-sm' : 'rounded-bl-sm'} max-w-[240px] cursor-zoom-in`}
              onClick={() => setLightboxSrc(message.imageUrl!)}
            >
              <img
                src={message.imageUrl}
                alt="imagem"
                className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                style={{ maxHeight: 240 }}
              />
            </div>
          )}

          {/* Text bubble */}
          {message.content && (
            <div className={`relative px-4 py-3 ${isUser ? 'msg-bubble-user' : 'msg-bubble-ai'}`}>
              <p className="text-sm leading-relaxed text-white whitespace-pre-wrap break-words">
                {message.content}
                {(() => {
                  const Icon = message.trailingIcon ? iconMap[message.trailingIcon] : null
                  return Icon ? <Icon size={13} className="inline-block ml-1.5 mb-0.5 opacity-75 align-middle" /> : null
                })()}
              </p>
            </div>
          )}

          {/* Time + read receipt */}
          <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'flex-row-reverse' : ''}`}>
            <span className="text-[10px] text-brand-muted">
              {formatTime(message.createdAt)}
            </span>
            {isUser && <CheckCheck size={11} className="text-accent-purple" />}
          </div>
        </div>

        {/* Delete button — only for user messages on hover */}
        {isUser && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={handleDelete}
            className="flex-shrink-0 mb-6 p-1.5 rounded-lg text-brand-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
            title="Apagar mensagem"
          >
            <Trash2 size={13} />
          </motion.button>
        )}
      </div>
    </motion.div>

    <AnimatePresence>
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </AnimatePresence>
    </>
  )
}
