import { motion } from 'framer-motion'
import { Users, MessageSquare, UserCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'

const tabs = [
  { id: 'characters' as const, icon: Users,       label: 'Amigas' },
  { id: 'chat'       as const, icon: MessageSquare, label: 'Chat'   },
  { id: 'profile'    as const, icon: UserCircle,  label: 'Perfil'  },
]

export default function MobileTabBar() {
  const { activeMobileTab, setActiveMobileTab, toggleSidebar } = useStore()

  const handle = (id: typeof tabs[0]['id']) => {
    setActiveMobileTab(id)
    if (id === 'characters') toggleSidebar()
  }

  return (
    <div
      className="md:hidden flex-shrink-0 flex items-center border-t border-white/5 bg-bg-surface/90 backdrop-blur-xl z-20"
      style={{ height: '56px' }}
    >
      {tabs.map((tab) => {
        const active = activeMobileTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => handle(tab.id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative"
          >
            {active && (
              <motion.div
                layoutId="tab-bar-indicator"
                className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-primary rounded-full"
              />
            )}
            <tab.icon size={20} className={active ? 'text-accent-purple' : 'text-brand-muted'} />
            <span className={`text-[10px] ${active ? 'text-accent-purple' : 'text-brand-muted'}`}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
