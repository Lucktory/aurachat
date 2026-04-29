import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useStore } from '@/store/useStore'
import CharacterCard from '@/components/characters/CharacterCard'
import StoriesBar from '@/components/stories/StoriesBar'

function SidebarContent({
  search,
  setSearch,
  filtered,
  selectedId,
  onSelect,
  onClose,
  showClose,
}: {
  search: string
  setSearch: (v: string) => void
  filtered: ReturnType<typeof useStore>['characters']
  selectedId?: string
  onSelect: (char: ReturnType<typeof useStore>['characters'][0]) => void
  onClose: () => void
  showClose: boolean
}) {
  return (
    <div className="w-72 h-full flex flex-col border-r border-white/5 bg-bg-surface">
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-brand-primary text-sm">Amigas IA</h2>
          {showClose && (
            <button onClick={onClose} className="p-1 rounded-lg text-brand-muted hover:text-brand-primary">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full bg-bg-overlay border border-white/5 rounded-xl pl-8 pr-3 py-2 text-xs text-brand-primary placeholder:text-brand-muted focus:outline-none focus:border-accent-purple/40 transition-colors"
          />
        </div>
      </div>

      {/* Stories bar */}
      <StoriesBar />

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {filtered.length === 0 ? (
          <p className="text-center text-brand-muted text-xs pt-8">Nenhum resultado encontrado</p>
        ) : (
          filtered.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onClick={() => onSelect(char)}
              isActive={selectedId === char.id}
              variant="list"
            />
          ))
        )}
      </div>
    </div>
  )
}

export default function Sidebar() {
  const {
    characters, selectedCharacter, isSidebarOpen,
    toggleSidebar, setCurrentPage, setProfileCharacter,
  } = useStore()
  const [search, setSearch] = useState('')

  const filtered = characters.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.shortBio.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (char: typeof characters[0]) => {
    setProfileCharacter(char)
    setCurrentPage('chat')
    if (window.innerWidth < 768) toggleSidebar()
  }

  const contentProps = {
    search,
    setSearch,
    filtered,
    selectedId: selectedCharacter?.id,
    onSelect: handleSelect,
    onClose: toggleSidebar,
  }

  return (
    <>
      <div
        className="hidden md:block flex-shrink-0 overflow-hidden transition-all duration-300"
        style={{ width: isSidebarOpen ? 288 : 0 }}
      >
        <SidebarContent {...contentProps} showClose={false} />
      </div>

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={toggleSidebar} />
          <div className="fixed top-14 left-0 bottom-0 z-30 md:hidden">
            <SidebarContent {...contentProps} showClose={true} />
          </div>
        </>
      )}
    </>
  )
}
