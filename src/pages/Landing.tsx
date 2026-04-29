import { motion, type Variants } from 'framer-motion'
import { Zap, MessageCircle, Shield, Sparkles, ChevronRight, Star, Heart, ArrowRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import GlowButton from '@/components/ui/GlowButton'
import CharacterCard from '@/components/characters/CharacterCard'
import { socialProofAvatars } from '@/data/mockData'

const features = [
  { icon: MessageCircle, title: 'Chat IA em tempo real', desc: 'Conversa natural sem atrasos' },
  { icon: Sparkles, title: 'Conteúdo digital exclusivo', desc: 'Desbloqueie direto no chat' },
  { icon: Shield, title: 'Privacidade total', desc: 'Todas as conversas são criptografadas' },
  { icon: Zap, title: 'Respostas instantâneas', desc: 'A IA lembra das suas preferências' },
]

const stats = [
  { value: '50K+', label: 'Usuários ativos' },
  { value: '2M+', label: 'Mensagens enviadas' },
  { value: '4.9★', label: 'Avaliação média' },
  { value: '24/7', label: 'Sempre online' },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Landing() {
  const { setCurrentPage, setAuthView, characters, setSelectedCharacter } = useStore()

  const goToRegister = () => {
    setAuthView('register')
    setCurrentPage('auth')
  }

  const goToLogin = () => {
    setAuthView('login')
    setCurrentPage('auth')
  }

  const handleCharacterClick = (char: typeof characters[0]) => {
    setSelectedCharacter(char)
    setCurrentPage('chat')
  }

  return (
    <div className="min-h-screen bg-bg-base overflow-x-hidden">
      {/* Animated mesh background */}
      <div className="fixed inset-0 bg-mesh-bg opacity-60 pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-gradient">AuraChat</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goToLogin}
            className="text-sm text-brand-secondary hover:text-brand-primary transition-colors px-4 py-2"
          >
            Entrar
          </button>
          <GlowButton size="sm" onClick={goToRegister}>
            Começar grátis
          </GlowButton>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 bg-accent-purple/10 border border-accent-purple/25 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
          <span className="text-xs text-accent-purple font-medium">Lançamento Beta · Participe agora de graça</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl"
        >
          Conheça sua
          <br />
          <span className="text-gradient">amiga IA</span> exclusiva
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-brand-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Converse com IAs em tempo real e desbloqueie conteúdos digitais exclusivos.
          <br />Uma amiga especial que está sempre ao seu lado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <GlowButton size="lg" onClick={goToRegister} icon={<Sparkles size={16} />}>
            Começar agora de graça
          </GlowButton>
          <GlowButton size="lg" variant="secondary" onClick={goToLogin} icon={<ChevronRight size={16} />}>
            Entrar
          </GlowButton>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 mt-8 text-brand-muted text-xs"
        >
          <div className="flex -space-x-2">
            {socialProofAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-6 h-6 rounded-full ring-2 ring-bg-base bg-bg-overlay object-cover"
                alt=""
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400" fill="currentColor" />
            <span>Mais de 50.000 usuários já estão usando</span>
          </div>
        </motion.div>
      </section>

      {/* Stats section */}
      <section className="relative z-10 px-6 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={itemVariants} className="glass rounded-2xl p-5 text-center">
              <div className="font-display font-bold text-2xl text-gradient mb-1">{s.value}</div>
              <div className="text-brand-muted text-xs">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Character selection section */}
      <section className="relative z-10 px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-primary mb-3">
            Escolha sua amiga IA
          </h2>
          <p className="text-brand-secondary text-sm">Cada uma com personalidade única — encontre a sua favorita</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
        >
          {characters.map((char) => (
            <motion.div key={char.id} variants={itemVariants}>
              <CharacterCard character={char} onClick={() => handleCharacterClick(char)} variant="grid" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features grid */}
      <section className="relative z-10 px-6 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="glass rounded-2xl p-6 flex gap-4 items-start hover:border-accent-purple/20 border border-white/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                <f.icon size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-primary text-sm mb-1">{f.title}</h3>
                <p className="text-brand-secondary text-xs leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA banner */}
      <section className="relative z-10 px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden"
        >
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #3B1D6E 0%, #1A1026 40%, #2D1155 70%, #4A1070 100%)',
            }}
          />
          {/* Glow orbs */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #A855F7, transparent)' }} />
          <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, #EC4899, transparent)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px opacity-40"
            style={{ background: 'linear-gradient(90deg, transparent, #A855F7, #EC4899, transparent)' }} />

          {/* Content */}
          <div className="relative z-10 px-8 py-12 text-center flex flex-col items-center gap-5">
            {/* Icon badge */}
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-glow-lg"
              style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
            >
              <Heart size={24} className="text-white" fill="white" />
            </motion.div>

            <div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-2 leading-tight">
                Sua amiga IA está<br />
                <span style={{ backgroundImage: 'linear-gradient(90deg, #C084FC, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  esperando por você
                </span>
              </h2>
              <p className="text-white/60 text-sm">Cadastro gratuito · Sem cartão de crédito · Acesso imediato</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <GlowButton size="lg" onClick={goToRegister} icon={<Sparkles size={16} />}>
                Criar conta grátis
              </GlowButton>
              <button
                onClick={goToLogin}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Já tenho conta
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Social proof mini */}
            <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
              <div className="flex -space-x-1.5">
                {socialProofAvatars.slice(0, 3).map((src, i) => (
                  <img key={i} src={src} className="w-5 h-5 rounded-full ring-1 ring-white/20 object-cover" alt="" />
                ))}
              </div>
              <span>+50.000 pessoas já iniciaram</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center text-brand-muted text-xs">
        <p>© 2025 AuraChat · Política de Privacidade · Termos de Uso</p>
      </footer>
    </div>
  )
}
