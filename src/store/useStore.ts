import { create } from 'zustand'
import type { User, Character, Conversation, Message, AppPage, AuthView } from '@/types'
import { mockCharacters } from '@/data/mockData'

interface AppState {
  currentPage: AppPage
  setCurrentPage: (page: AppPage) => void

  authView: AuthView
  setAuthView: (view: AuthView) => void
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean

  characters: Character[]
  selectedCharacter: Character | null
  setSelectedCharacter: (character: Character) => void
  blockCharacter: (characterId: string) => void

  conversations: Map<string, Conversation>
  activeConversationId: string | null
  setActiveConversation: (id: string) => void
  addMessage: (conversationId: string, message: Message) => void
  deleteMessage: (conversationId: string, messageId: string) => void
  clearConversation: (conversationId: string) => void
  unlockContent: (conversationId: string, messageId: string, fullUrl: string) => void

  showCreditsModal: boolean
  setShowCreditsModal: (show: boolean) => void
  spendCredits: (amount: number) => boolean
  addCredits: (amount: number) => void

  isSidebarOpen: boolean
  toggleSidebar: () => void
  isTyping: boolean
  setIsTyping: (typing: boolean) => void

  isMobile: boolean
  activeMobileTab: 'characters' | 'chat' | 'profile'
  setActiveMobileTab: (tab: 'characters' | 'chat' | 'profile') => void

  profileCharacter: Character | null
  setProfileCharacter: (c: Character | null) => void

  seenStories: string[]
  markStorySeen: (id: string) => void
}

export const useStore = create<AppState>((set, get) => ({
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),

  authView: 'login',
  setAuthView: (view) => set({ authView: view }),
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  isAuthenticated: false,

  characters: mockCharacters,
  selectedCharacter: null,

  setSelectedCharacter: (character) => {
    const { conversations, setActiveConversation } = get()
    const convId = `conv_${character.id}`
    if (!conversations.has(convId)) {
      const newConv: Conversation = {
        id: convId, characterId: character.id, character, messages: [], unreadCount: 0,
      }
      set((s) => ({
        selectedCharacter: character,
        conversations: new Map(s.conversations).set(convId, newConv),
      }))
    } else {
      set({ selectedCharacter: character })
    }
    setActiveConversation(convId)
  },

  blockCharacter: (characterId) => {
    set((s) => {
      const convId = `conv_${characterId}`
      const convs = new Map(s.conversations)
      convs.delete(convId)
      return {
        characters: s.characters.filter((c) => c.id !== characterId),
        selectedCharacter: s.selectedCharacter?.id === characterId ? null : s.selectedCharacter,
        activeConversationId: s.activeConversationId === convId ? null : s.activeConversationId,
        conversations: convs,
      }
    })
  },

  conversations: new Map(),
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),

  addMessage: (conversationId, message) => {
    set((s) => {
      const convs = new Map(s.conversations)
      const conv = convs.get(conversationId)
      if (!conv) return s
      convs.set(conversationId, {
        ...conv,
        messages: [...conv.messages, message],
        lastMessage: message.content,
        lastMessageAt: message.createdAt,
      })
      return { conversations: convs }
    })
  },

  deleteMessage: (conversationId, messageId) => {
    set((s) => {
      const convs = new Map(s.conversations)
      const conv = convs.get(conversationId)
      if (!conv) return s
      convs.set(conversationId, {
        ...conv,
        messages: conv.messages.map((m) =>
          m.id === messageId ? { ...m, deleted: true, content: '', imageUrl: undefined } : m
        ),
      })
      return { conversations: convs }
    })
  },

  clearConversation: (conversationId) => {
    set((s) => {
      const convs = new Map(s.conversations)
      const conv = convs.get(conversationId)
      if (!conv) return s
      convs.set(conversationId, { ...conv, messages: [], lastMessage: undefined, lastMessageAt: undefined })
      return { conversations: convs }
    })
  },

  unlockContent: (conversationId, messageId, fullUrl) => {
    set((s) => {
      const convs = new Map(s.conversations)
      const conv = convs.get(conversationId)
      if (!conv) return s
      convs.set(conversationId, {
        ...conv,
        messages: conv.messages.map((m) =>
          m.id === messageId && m.lockedContent
            ? { ...m, lockedContent: { ...m.lockedContent, isUnlocked: true, fullUrl } }
            : m
        ),
      })
      return { conversations: convs }
    })
  },

  showCreditsModal: false,
  setShowCreditsModal: (show) => set({ showCreditsModal: show }),
  spendCredits: (amount) => {
    const { user } = get()
    if (!user || user.credits < amount) return false
    set({ user: { ...user, credits: user.credits - amount } })
    return true
  },
  addCredits: (amount) => {
    const { user } = get()
    if (!user) return
    set({ user: { ...user, credits: user.credits + amount } })
  },

  isSidebarOpen: typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  isTyping: false,
  setIsTyping: (typing) => set({ isTyping: typing }),

  isMobile: window.innerWidth < 768,
  activeMobileTab: 'characters',
  setActiveMobileTab: (tab) => set({ activeMobileTab: tab }),

  profileCharacter: null,
  setProfileCharacter: (c) => set({ profileCharacter: c }),

  seenStories: [],
  markStorySeen: (id) => set((s) => ({
    seenStories: s.seenStories.includes(id) ? s.seenStories : [...s.seenStories, id],
  })),
}))
