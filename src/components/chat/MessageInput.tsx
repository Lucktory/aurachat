import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Smile, ImagePlus, X } from 'lucide-react'

interface MessageInputProps {
  onSend: (text: string, imageUrl?: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const send = () => {
    const t = text.trim()
    if ((!t && !imagePreview) || disabled) return
    onSend(t, imagePreview ?? undefined)
    setText('')
    setImagePreview(null)
    if (textRef.current) {
      textRef.current.style.height = 'auto'
      textRef.current.focus()
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  useEffect(() => {
    if (!disabled) textRef.current?.focus()
  }, [disabled])

  const canSend = (text.trim().length > 0 || !!imagePreview) && !disabled

  return (
    <div className="flex-shrink-0 px-4 pt-3 pb-4 border-t border-white/5">

      {/* Image preview strip */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2 overflow-hidden"
          >
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="preview"
                className="h-20 w-auto rounded-xl object-cover border border-white/10"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-bg-overlay border border-white/15 flex items-center justify-center text-brand-muted hover:text-brand-primary"
              >
                <X size={11} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input row */}
      <div className="glass rounded-2xl border border-white/10 flex items-end gap-2 p-2 focus-within:border-accent-purple/35 transition-colors">
        <button className="p-2 rounded-xl text-brand-muted hover:text-brand-secondary hover:bg-bg-hover transition-colors flex-shrink-0">
          <Smile size={18} />
        </button>

        <textarea
          ref={textRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder="Digite uma mensagem..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-brand-primary placeholder:text-brand-muted resize-none focus:outline-none py-2 min-h-[36px] max-h-[120px] leading-relaxed"
        />

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileRef.current?.click()}
          className="p-2 rounded-xl text-brand-muted hover:text-brand-secondary hover:bg-bg-hover transition-colors flex-shrink-0"
        >
          <ImagePlus size={18} />
        </button>

        <motion.button
          onClick={send}
          disabled={!canSend}
          className={`p-2.5 rounded-xl flex-shrink-0 transition-all ${
            canSend ? 'glow-btn text-white shadow-glow-sm' : 'bg-bg-overlay text-brand-muted cursor-not-allowed'
          }`}
          animate={canSend ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          whileTap={canSend ? { scale: 0.9, rotate: 15 } : {}}
        >
          <Send size={16} />
        </motion.button>
      </div>

      <p className="text-center text-[10px] text-brand-muted mt-2">
        Conteúdo gerado por IA · Privacidade protegida
      </p>
    </div>
  )
}
