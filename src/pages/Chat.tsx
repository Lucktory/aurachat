import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import MobileTabBar from '@/components/layout/MobileTabBar'
import ChatWindow from '@/components/chat/ChatWindow'
import CreditsModal from '@/components/ui/CreditsModal'
import CharacterProfileModal from '@/components/characters/CharacterProfileModal'

export default function Chat() {
  const {
    setCurrentPage, isAuthenticated, characters, selectedCharacter, setSelectedCharacter,
    showCreditsModal, setShowCreditsModal,
    profileCharacter, setProfileCharacter,
  } = useStore()

  useEffect(() => {
    if (!isAuthenticated) setCurrentPage('auth')
  }, [isAuthenticated])

  useEffect(() => {
    if (characters.length > 0 && !selectedCharacter) {
      setSelectedCharacter(characters[0])
    }
  }, [characters, selectedCharacter])

  return (
    <>
      <div style={{ height: '100vh' }} className="flex flex-col bg-bg-base overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <ChatWindow />
          </main>
        </div>
        <MobileTabBar />
      </div>

      <AnimatePresence>
        {showCreditsModal && <CreditsModal onClose={() => setShowCreditsModal(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {profileCharacter && (
          <CharacterProfileModal
            character={profileCharacter}
            onClose={() => setProfileCharacter(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
