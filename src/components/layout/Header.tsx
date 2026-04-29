import { Zap, Menu, LogOut, Coins } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function Header() {
  const { user, toggleSidebar, setCurrentPage, setUser, setShowCreditsModal } = useStore()

  return (
    <header
      style={{ height: '56px' }}
      className="flex-shrink-0 flex items-center px-4 gap-3 border-b border-white/5 bg-bg-surface/80 backdrop-blur-xl z-10"
    >
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg text-brand-muted hover:text-brand-primary hover:bg-bg-hover transition-colors"
      >
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-2 mr-auto">
        <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-display font-bold text-base text-gradient hidden sm:block">AuraChat</span>
      </div>

      {user && (
        <div onClick={() => setShowCreditsModal(true)} className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-3 py-1.5 cursor-pointer hover:bg-yellow-400/18 transition-colors">
          <Coins size={14} className="text-yellow-400" />
          <span className="text-xs font-semibold text-yellow-300">{user.credits}</span>
          <span className="text-xs text-yellow-400/60 hidden sm:block">créditos</span>
        </div>
      )}

      {user ? (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-accent-purple/30">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {user.username[0].toUpperCase()}
              </div>
            )}
          </div>
          <button
            onClick={() => { setUser(null); setCurrentPage('landing') }}
            className="p-2 rounded-lg text-brand-muted hover:text-accent-pink hover:bg-bg-hover transition-colors"
            title="Sair"
          >
            <LogOut size={15} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setCurrentPage('auth')}
          className="text-sm text-brand-secondary hover:text-brand-primary transition-colors"
        >
          Entrar
        </button>
      )}
    </header>
  )
}
