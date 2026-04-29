import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Lock, Unlock, Image, Video, Sparkles, Coins } from 'lucide-react'
import type { LockedContent as LockedContentType } from '@/types'
import ParticleEffect from '@/components/ui/ParticleEffect'
import ImageLightbox from '@/components/ui/ImageLightbox'
import { useStore } from '@/store/useStore'

interface LockedContentProps {
  content: LockedContentType
  onUnlock: () => void
}

export default function LockedContent({ content, onUnlock }: LockedContentProps) {
  const { spendCredits, setShowCreditsModal } = useStore()
  const [isPaying, setIsPaying] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [particlePos, setParticlePos] = useState({ x: 0, y: 0 })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  const creditsNeeded = Math.ceil(content.price)

  const handleUnlock = async () => {
    if (!spendCredits(creditsNeeded)) {
      setShowCreditsModal(true)
      return
    }

    setIsPaying(true)
    await new Promise((r) => setTimeout(r, 1500))

    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setParticlePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    }
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 2000)
    setIsPaying(false)
    onUnlock()
  }

  const formatPrice = (price: number, currency: string) =>
    currency === 'BRL' ? `R$ ${price.toFixed(2)}` : `$${price.toFixed(2)}`

  const TypeIcon = content.type === 'video' ? Video : Image

  return (
    <>
      <ParticleEffect trigger={showParticles} x={particlePos.x} y={particlePos.y} count={30} />

      <div className="relative rounded-2xl overflow-hidden w-64 max-w-full">
        {/* Preview image */}
        <div className="relative">
          <motion.div
            className="w-full h-44 bg-gradient-to-br from-bg-overlay to-bg-base flex items-center justify-center"
            animate={content.isUnlocked ? { filter: 'blur(0px)' } : { filter: 'blur(18px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {content.previewUrl ? (
              <img
                src={content.previewUrl}
                alt="locked content"
                className={`w-full h-full object-cover ${content.isUnlocked ? 'cursor-zoom-in' : ''}`}
                onClick={content.isUnlocked ? () => setLightboxOpen(true) : undefined}
              />
            ) : (
              <div className="text-accent-purple/30">
                <TypeIcon size={48} />
              </div>
            )}
          </motion.div>

          {!content.isUnlocked && (
            <div className="absolute inset-0 locked-overlay" />
          )}
        </div>

        {/* Unlock / unlocked badge */}
        <AnimatePresence>
          {!content.isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-4 px-4"
            >
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center mb-2 ring-2 ring-white/10">
                <Lock size={18} className="text-white" />
              </div>

              <p className="text-brand-secondary text-xs mb-1 text-center">
                {content.label || `Conteúdo ${content.type === 'video' ? 'de vídeo' : 'de foto'} premium`}
              </p>

              <div className="flex items-center gap-1 mb-2">
                <Coins size={12} className="text-yellow-400" />
                <span className="text-yellow-300 text-xs font-semibold">{creditsNeeded} créditos</span>
                <span className="text-brand-muted text-xs">· {formatPrice(content.price, content.currency)}</span>
              </div>

              <motion.button
                ref={btnRef}
                onClick={handleUnlock}
                disabled={isPaying}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white glow-btn flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
                animate={
                  !isPaying
                    ? { boxShadow: ['0 0 18px rgba(168,85,247,0.35)', '0 0 36px rgba(168,85,247,0.65)', '0 0 18px rgba(168,85,247,0.35)'] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isPaying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Desbloquear</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/20 border border-green-400/30 rounded-full px-2 py-1 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <Unlock size={10} className="text-green-400" />
              <span className="text-[10px] text-green-400 font-medium">Desbloqueado · Ver</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox for unlocked content */}
      <AnimatePresence>
        {lightboxOpen && content.previewUrl && (
          <ImageLightbox
            src={content.fullUrl || content.previewUrl}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
