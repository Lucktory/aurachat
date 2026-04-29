import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, MicOff, Video, VideoOff, PhoneOff, Volume2 } from 'lucide-react'
import type { Character } from '@/types'

interface CallModalProps {
  character: Character
  mode: 'voice' | 'video'
  onClose: () => void
}

type CallState = 'ringing' | 'connected'

export default function CallModal({ character, mode, onClose }: CallModalProps) {
  const [callState, setCallState] = useState<CallState>('ringing')
  const [seconds, setSeconds] = useState(0)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)

  // Auto-connect after 3 s
  useEffect(() => {
    const t = setTimeout(() => setCallState('connected'), 3000)
    return () => clearTimeout(t)
  }, [])

  // Timer when connected
  useEffect(() => {
    if (callState !== 'connected') return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [callState])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const ss = (s % 60).toString().padStart(2, '0')
    return `${m}:${ss}`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(8,6,13,0.92)', backdropFilter: 'blur(24px)' }}
      >
        {/* Video call — full bg photo */}
        {mode === 'video' && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={character.coverUrl || character.avatarUrl}
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center gap-6 px-8 w-full max-w-sm">

          {/* Avatar with ringing pulse */}
          <div className="relative">
            {callState === 'ringing' && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full bg-accent-purple/40"
                />
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                  className="absolute inset-0 rounded-full bg-accent-purple/20"
                />
              </>
            )}
            {callState === 'connected' && (
              <motion.div
                animate={{ boxShadow: ['0 0 0 0 rgba(168,85,247,0.6)', '0 0 0 20px rgba(168,85,247,0)', '0 0 0 0 rgba(168,85,247,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
            )}
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-accent-purple/50 shadow-glow-lg relative z-10">
              <img src={character.avatarUrl} alt={character.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Name + status */}
          <div className="text-center">
            <h2 className="font-display font-bold text-2xl text-brand-primary mb-1">{character.name}</h2>
            {callState === 'ringing' ? (
              <motion.p
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-brand-secondary text-sm"
              >
                {mode === 'video' ? 'Chamada de vídeo...' : 'Chamando...'}
              </motion.p>
            ) : (
              <p className="text-green-400 text-sm font-medium">{fmt(seconds)}</p>
            )}
          </div>

          {/* My video preview (video call only) */}
          {mode === 'video' && callState === 'connected' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-40 right-6 w-24 h-32 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-card bg-bg-overlay flex items-center justify-center"
            >
              {camOn ? (
                <div className="w-full h-full bg-gradient-to-br from-bg-overlay to-bg-surface flex items-center justify-center">
                  <Video size={24} className="text-brand-muted" />
                </div>
              ) : (
                <VideoOff size={20} className="text-brand-muted" />
              )}
            </motion.div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-5 mt-2">
            {/* Mic */}
            <button
              onClick={() => setMicOn(!micOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                micOn ? 'bg-white/10 text-brand-primary hover:bg-white/15' : 'bg-white/10 text-red-400'
              }`}
            >
              {micOn ? <Mic size={22} /> : <MicOff size={22} />}
            </button>

            {/* End call */}
            <button
              onClick={onClose}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <PhoneOff size={26} className="text-white" />
            </button>

            {/* Camera (video) / Speaker (voice) */}
            {mode === 'video' ? (
              <button
                onClick={() => setCamOn(!camOn)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  camOn ? 'bg-white/10 text-brand-primary hover:bg-white/15' : 'bg-white/10 text-red-400'
                }`}
              >
                {camOn ? <Video size={22} /> : <VideoOff size={22} />}
              </button>
            ) : (
              <button className="w-14 h-14 rounded-full bg-white/10 text-brand-primary hover:bg-white/15 flex items-center justify-center transition-all">
                <Volume2 size={22} />
              </button>
            )}
          </div>

          {/* Close (X) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-brand-muted hover:text-brand-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
