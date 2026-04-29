import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { mockStories } from '@/data/mockData'
import StoryViewer from './StoryViewer'

export default function StoriesBar() {
  const { characters, seenStories } = useStore()
  const [viewing, setViewing] = useState<string | null>(null)

  const charsWithStories = characters.filter((c) =>
    mockStories.some((s) => s.characterId === c.id)
  )
  if (charsWithStories.length === 0) return null

  const hasUnseen = (charId: string) =>
    mockStories.filter((s) => s.characterId === charId).some((s) => !seenStories.includes(s.id))

  const viewingChar = charsWithStories.find((c) => c.id === viewing) ?? null
  const viewingStories = viewing ? mockStories.filter((s) => s.characterId === viewing) : []

  return (
    <>
      <div className="flex gap-3 px-3 py-3 border-b border-white/5 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}>
        {charsWithStories.map((char) => {
          const unseen = hasUnseen(char.id)
          return (
            <button
              key={char.id}
              onClick={() => setViewing(char.id)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
            >
              <div
                className="p-[2px] rounded-full transition-opacity group-hover:opacity-80"
                style={{
                  background: unseen
                    ? 'linear-gradient(135deg, #A855F7, #EC4899)'
                    : 'rgba(255,255,255,0.12)',
                }}
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{ padding: '2px', background: '#100D18' }}
                >
                  <div className="w-11 h-11 rounded-full overflow-hidden">
                    <img src={char.avatarUrl} alt={char.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <span className={`text-[10px] truncate w-14 text-center ${unseen ? 'text-brand-primary font-medium' : 'text-brand-muted'}`}>
                {char.name}
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {viewingChar && (
          <StoryViewer
            key={viewingChar.id}
            stories={viewingStories}
            character={viewingChar}
            onClose={() => setViewing(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
