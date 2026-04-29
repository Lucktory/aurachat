import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Phone, Video, MessageCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'
import type { Message } from '@/types'
import { getRelationshipLevel } from '@/utils/relationship'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import MessageInput from './MessageInput'
import CallModal from './CallModal'
import ChatMenu from './ChatMenu'
import { mockResponses } from '@/data/mockData'
import Avatar from '@/components/ui/Avatar'

let msgCounter = 0
function makeId() {
  return `msg_${Date.now()}_${++msgCounter}`
}

const UNS = 'https://images.unsplash.com'
const lockedContentPool = [
  { id: 'lc1', type: 'image' as const, previewUrl: `${UNS}/photo-1529626455594-4ff0802cfb7e?w=280&h=200&fit=crop&crop=face&auto=format&q=80`, price: 9.9,  currency: 'BRL' as const, isUnlocked: false, label: 'Foto exclusiva' },
  { id: 'lc2', type: 'image' as const, previewUrl: `${UNS}/photo-1531746020798-e6953c6e8e04?w=280&h=200&fit=crop&crop=face&auto=format&q=80`, price: 14.9, currency: 'BRL' as const, isUnlocked: false, label: 'Foto especial para você' },
  { id: 'lc3', type: 'video' as const, previewUrl: `${UNS}/photo-1534528741775-53994a69daeb?w=280&h=200&fit=crop&crop=face&auto=format&q=80`, price: 24.9, currency: 'BRL' as const, isUnlocked: false, label: 'Video exclusivo' },
  { id: 'lc4', type: 'image' as const, previewUrl: `${UNS}/photo-1517841905240-472988babdf9?w=280&h=200&fit=crop&crop=face&auto=format&q=80`, price: 9.9,  currency: 'BRL' as const, isUnlocked: false, label: 'Surpresa especial' },
]

const tagStarters: Record<string, { text: string; icon: string }> = {
  'Animada':     { text: 'Você parece muito animada! O que te deixa mais feliz no dia a dia?',      icon: 'Zap'          },
  'Divertida':   { text: 'Adoro pessoas divertidas! Me conta uma coisa engraçada que aconteceu com você', icon: 'Smile'     },
  'Sincera':     { text: 'Gosto muito de sinceridade. Me fala uma coisa que você pensa mas raramente diz?', icon: 'MessageCircle' },
  'Sensível':    { text: 'Adoro que você é tão sensível. Me conta o que mais te emociona na vida', icon: 'Heart'        },
  'Amigável':    { text: 'Que bom que você é amigável! Me conta o que você gosta de fazer nas horas livres?', icon: 'Users' },
  'Misteriosa':  { text: 'Você tem um lado misterioso... me conta um segredo?',                     icon: 'Gem'          },
  'Inteligente': { text: 'Você parece muito inteligente! Qual assunto você mais domina?',           icon: 'Lightbulb'    },
  'Carinhosa':   { text: 'Adoro pessoas carinhosas. Como você demonstra carinho pelas pessoas especiais?', icon: 'Heart'  },
  'Romântica':   { text: 'Romantismo é tudo! Me conta seu jeito favorito de demonstrar amor',       icon: 'Flower2'      },
  'Aventureira': { text: 'Adoro aventura! Qual foi o lugar mais incrível que você já foi?',         icon: 'Compass'      },
  'Criativa':    { text: 'Você é criativa! Me conta sobre algo que você criou e se orgulha muito',  icon: 'Palette'      },
  'Mistério':    { text: 'Tem algo misterioso em você que me fascina... o que você esconde?',       icon: 'Gem'          },
  'Premium':     { text: 'Você é especial de um jeito único. Me conta o que te faz diferente de todas as outras?', icon: 'Crown' },
}

const lockedMessages = [
  'Preparei algo especial para você.',
  'Tenho uma surpresa só para você.',
  'Quero te mostrar algo exclusivo.',
  'Isso é só para você ver.',
]

export default function ChatWindow() {
  const {
    activeConversationId,
    conversations,
    addMessage,
    clearConversation,
    selectedCharacter,
    isTyping,
    setIsTyping,
    blockCharacter,
    setCurrentPage,
    toggleSidebar,
  } = useStore()

  const bottomRef = useRef<HTMLDivElement>(null)
  const [lockedIdx, setLockedIdx] = useState(0)
  const [msgCount, setMsgCount] = useState(0)
  const [callMode, setCallMode] = useState<'voice' | 'video' | null>(null)
  const [showBlockConfirm, setShowBlockConfirm] = useState(false)

  const conversation = activeConversationId ? conversations.get(activeConversationId) : null
  const character = selectedCharacter || conversation?.character

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages.length, isTyping])

  const handleSend = (text: string, imageUrl?: string, trailingIcon?: string) => {
    if (!activeConversationId || !character) return

    const nextCount = msgCount + 1
    setMsgCount(nextCount)

    const userMsg: Message = {
      id: makeId(),
      conversationId: activeConversationId,
      role: 'user',
      content: text,
      createdAt: new Date(),
      imageUrl,
      trailingIcon,
    }
    addMessage(activeConversationId, userMsg)
    setIsTyping(true)

    const shouldLock = nextCount % 3 === 0
    const poolItem = lockedContentPool[lockedIdx % lockedContentPool.length]

    setTimeout(() => {
      setIsTyping(false)
      const aiMsg: Message = {
        id: makeId(),
        conversationId: activeConversationId,
        role: 'assistant',
        content: shouldLock
          ? lockedMessages[lockedIdx % lockedMessages.length]
          : mockResponses[Math.floor(Math.random() * mockResponses.length)],
        createdAt: new Date(),
        lockedContent: shouldLock ? { ...poolItem, id: `${poolItem.id}_${Date.now()}` } : undefined,
      }
      if (shouldLock) setLockedIdx((i) => i + 1)
      addMessage(activeConversationId, aiMsg)
    }, 1000 + Math.random() * 1200)
  }

  const handleClearChat = () => {
    if (activeConversationId) clearConversation(activeConversationId)
  }

  if (!character) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-glow-md"
        >
          <MessageCircle size={36} className="text-white" />
        </motion.div>
        <h3 className="font-display font-bold text-brand-primary text-lg mb-2">Comece uma conversa</h3>
        <p className="text-brand-secondary text-sm max-w-xs">Selecione uma IA amiga na lista e comece a conversar</p>
      </div>
    )
  }

  const messages = (conversation?.messages ?? []).filter((m) => !m.deleted)
  const rel = getRelationshipLevel(messages.length)

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Chat top bar */}
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-bg-surface/60 backdrop-blur-sm">
          <button
            onClick={() => { setCurrentPage('chat'); toggleSidebar() }}
            className="md:hidden p-2 rounded-lg text-brand-muted hover:text-brand-primary"
          >
            <ArrowLeft size={18} />
          </button>

          <Avatar src={character.avatarUrl} name={character.name} size="md" isOnline={character.isOnline} />

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-brand-primary text-sm truncate">{character.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-brand-secondary">
                {isTyping ? (
                  <span className="text-green-400 animate-pulse">digitando...</span>
                ) : character.isOnline ? 'Online' : 'Offline'}
              </p>
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-16 h-1 rounded-full bg-white/8 overflow-hidden flex-shrink-0">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: rel.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${rel.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[10px] font-medium truncate" style={{ color: rel.color }}>
                  {rel.label}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCallMode('voice')}
              className="p-2 rounded-lg text-brand-muted hover:text-brand-secondary hover:bg-bg-hover transition-colors"
            >
              <Phone size={16} />
            </button>
            <button
              onClick={() => setCallMode('video')}
              className="p-2 rounded-lg text-brand-muted hover:text-brand-secondary hover:bg-bg-hover transition-colors"
            >
              <Video size={16} />
            </button>
            <ChatMenu character={character} onClearChat={handleClearChat} onRequestBlock={() => setShowBlockConfirm(true)} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-8 gap-3"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-accent-purple/20 shadow-glow-md">
                <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-brand-primary text-base">{character.name}</h4>
                <p className="text-brand-secondary text-sm mt-1 max-w-xs">{character.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {character.tags.map((tag) => (
                  <motion.button
                    key={tag}
                    onClick={() => { const s = tagStarters[tag]; handleSend(s?.text ?? `Me conta mais sobre ser ${tag.toLowerCase()}!`, undefined, s?.icon) }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20 hover:bg-accent-purple/22 hover:border-accent-purple/50 transition-colors cursor-pointer"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
              <p className="text-brand-muted text-xs">Toque em uma tag ou escreva uma mensagem</p>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                character={character}
                showAvatar={msg.role === 'assistant' && (i === 0 || messages[i - 1]?.role !== 'assistant')}
              />
            ))}
            {isTyping && <TypingIndicator key="typing" character={character} />}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <MessageInput onSend={handleSend} disabled={isTyping} />
      </div>

      {/* Call modal */}
      <AnimatePresence>
        {callMode && (
          <CallModal
            key={callMode}
            character={character}
            mode={callMode}
            onClose={() => setCallMode(null)}
          />
        )}
      </AnimatePresence>

      {/* Block confirm modal — rendered here (outside backdrop-blur header) so fixed inset-0 is viewport-relative */}
      <AnimatePresence>
        {showBlockConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(8,6,13,0.85)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl p-6 border border-white/8"
              style={{ background: '#1A1526' }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-red-400/30">
                  <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand-primary text-lg mb-1">
                    Bloquear {character.name}?
                  </h3>
                  <p className="text-brand-secondary text-sm">
                    Todo o histórico de conversa será removido e você não poderá mais interagir.
                  </p>
                </div>
                <div className="flex gap-3 w-full mt-1">
                  <button
                    onClick={() => setShowBlockConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-brand-secondary text-sm hover:bg-white/5 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => { blockCharacter(character.id); setShowBlockConfirm(false); setCurrentPage('chat') }}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                  >
                    Bloquear
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
