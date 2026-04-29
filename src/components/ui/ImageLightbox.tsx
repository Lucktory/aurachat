import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface ImageLightboxProps {
  src: string
  alt?: string
  onClose: () => void
}

export default function ImageLightbox({ src, alt = 'imagem', onClose }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Image container */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.82, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center justify-center"
      >
        <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease', transformOrigin: 'center' }}>
          <img
            src={src}
            alt={alt}
            className="max-w-[88vw] max-h-[80vh] rounded-2xl object-contain shadow-2xl select-none"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Zoom controls */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)))}
          className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <ZoomOut size={16} />
        </button>

        <button
          onClick={() => setZoom(1)}
          className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-brand-secondary flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm text-xs font-bold"
        >
          <RotateCcw size={14} />
        </button>

        <button
          onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
          className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <ZoomIn size={16} />
        </button>

        <span className="text-xs text-brand-muted ml-1 font-mono">{Math.round(zoom * 100)}%</span>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  )
}
