import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useStore } from '@/store/useStore'
import Landing from '@/pages/Landing'
import Auth from '@/pages/Auth'
import Chat from '@/pages/Chat'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function App() {
  const { currentPage } = useStore()

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1A1526',
            color: '#F0F0FF',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#A855F7', secondary: '#fff' } },
        }}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div key="landing" {...pageVariants} transition={{ duration: 0.3 }}>
            <Landing />
          </motion.div>
        )}
        {currentPage === 'auth' && (
          <motion.div key="auth" {...pageVariants} transition={{ duration: 0.3 }}>
            <Auth />
          </motion.div>
        )}
        {currentPage === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Chat />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
