import { motion } from 'framer-motion'
import { X, Coins, Zap, Star, Crown, Gem } from 'lucide-react'
import { useStore } from '@/store/useStore'

const packages = [
  { id: 'p1', credits: 100,  price: 9.90,  label: 'Básico',   Icon: Zap,   popular: false },
  { id: 'p2', credits: 300,  price: 24.90, label: 'Popular',  Icon: Star,  popular: true  },
  { id: 'p3', credits: 600,  price: 44.90, label: 'Premium',  Icon: Crown, popular: false },
  { id: 'p4', credits: 1500, price: 89.90, label: 'Elite',    Icon: Gem,   popular: false },
]

interface CreditsModalProps {
  onClose: () => void
}

export default function CreditsModal({ onClose }: CreditsModalProps) {
  const { user, addCredits } = useStore()

  const handleBuy = (credits: number) => {
    addCredits(credits)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(8,6,13,0.88)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl border border-white/8 overflow-hidden"
        style={{ background: '#1A1526' }}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-yellow-400/12 border border-yellow-400/20 flex items-center justify-center mx-auto mb-3">
            <Coins size={28} className="text-yellow-400" />
          </div>
          <h2 className="font-display font-bold text-xl text-brand-primary mb-1">Comprar Créditos</h2>
          <p className="text-brand-secondary text-sm">
            Saldo atual:{' '}
            <span className="text-yellow-300 font-semibold">{user?.credits ?? 0} créditos</span>
          </p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-brand-muted hover:text-brand-primary hover:bg-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Packages */}
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          {packages.map(({ id, credits, price, label, Icon, popular }) => (
            <button
              key={id}
              onClick={() => handleBuy(credits)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:scale-[1.03] active:scale-[0.97] ${
                popular
                  ? 'border-accent-purple/50 bg-accent-purple/10 shadow-glow-sm'
                  : 'border-white/8 bg-white/3 hover:border-white/15'
              }`}
            >
              {popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-primary text-white text-[10px] font-bold whitespace-nowrap">
                  Mais popular
                </div>
              )}
              <Icon size={20} className={popular ? 'text-accent-purple' : 'text-brand-secondary'} />
              <div className="text-center">
                <p className="font-bold text-brand-primary text-xl leading-none">{credits}</p>
                <p className="text-[11px] text-brand-muted mt-0.5">créditos</p>
              </div>
              <p className={`text-sm font-semibold ${popular ? 'text-accent-purple' : 'text-brand-secondary'}`}>
                R$ {price.toFixed(2)}
              </p>
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-brand-muted pb-5">
          Pagamento seguro · Créditos sem expiração
        </p>
      </motion.div>
    </motion.div>
  )
}
