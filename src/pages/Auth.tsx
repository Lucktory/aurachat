import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useStore } from '@/store/useStore'
import GlowButton from '@/components/ui/GlowButton'

interface Field {
  icon: typeof Mail
  type: string
  placeholder: string
  key: string
}

export default function Auth() {
  const { authView, setAuthView, setUser, setCurrentPage } = useStore()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', username: '' })

  const isLogin = authView === 'login'

  const fields: Field[] = [
    ...(!isLogin ? [{ icon: User, type: 'text', placeholder: 'Nome de usuário', key: 'username' }] : []),
    { icon: Mail, type: 'email', placeholder: 'Endereço de e-mail', key: 'email' },
    { icon: Lock, type: showPass ? 'text' : 'password', placeholder: 'Senha', key: 'password' },
  ]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))

    setUser({
      id: 'user_1',
      email: form.email,
      username: form.username || form.email.split('@')[0],
      credits: 100,
      subscriptionTier: 'free',
    })
    setCurrentPage('chat')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-4 relative overflow-hidden">
      {/* Mesh background */}
      <div className="fixed inset-0 bg-mesh-bg opacity-50 pointer-events-none" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to landing */}
      <button
        onClick={() => setCurrentPage('landing')}
        className="fixed top-6 left-6 flex items-center gap-2 text-brand-secondary hover:text-brand-primary text-sm transition-colors z-10"
      >
        <ArrowLeft size={16} />
        <span>Voltar</span>
      </button>

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="gradient-border p-8 shadow-card-hover">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-md mb-4">
              <Zap size={22} className="text-white" />
            </div>
            <h1 className="font-display font-bold text-2xl text-brand-primary">
              {isLogin ? 'Bem-vindo de volta!' : 'Criar conta no AuraChat'}
            </h1>
            <p className="text-brand-secondary text-sm mt-1.5">
              {isLogin ? 'Faça login na sua conta' : 'Crie sua conta gratuita'}
            </p>
          </div>

          {/* Login / register form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {fields.map((field) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <field.icon
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted z-10"
                  />
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    required
                    className="w-full bg-bg-overlay border border-white/8 rounded-xl pl-10 pr-10 py-3 text-sm text-brand-primary placeholder:text-brand-muted focus:outline-none focus:border-accent-purple/50 focus:shadow-glow-sm transition-all"
                  />
                  {field.key === 'password' && (
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-secondary"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs text-accent-purple hover:text-accent-pink transition-colors">
                  Esqueceu sua senha?
                </button>
              </div>
            )}

            <GlowButton type="submit" size="lg" loading={loading} className="w-full mt-2">
              {isLogin ? 'Entrar' : 'Criar conta'}
            </GlowButton>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-brand-muted text-xs">ou</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Toggle between login and register */}
          <p className="text-center text-brand-secondary text-sm">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
            <button
              onClick={() => setAuthView(isLogin ? 'register' : 'login')}
              className="text-accent-purple hover:text-accent-pink font-semibold transition-colors"
            >
              {isLogin ? 'Cadastre-se' : 'Entrar'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
