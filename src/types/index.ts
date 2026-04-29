export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  credits: number
  subscriptionTier: 'free' | 'premium'
}

export interface Character {
  id: string
  name: string
  avatarUrl: string
  coverUrl?: string
  description: string
  shortBio: string
  tags: string[]
  isOnline: boolean
  isPremium: boolean
  messageCount: number
  rating: number
}

export interface Message {
  id: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
  imageUrl?: string
  trailingIcon?: string
  lockedContent?: LockedContent
  deleted?: boolean
}

export interface LockedContent {
  id: string
  type: 'image' | 'video'
  previewUrl: string
  fullUrl?: string
  price: number
  currency: 'USD' | 'BRL'
  isUnlocked: boolean
  label?: string
}

export interface Conversation {
  id: string
  characterId: string
  character: Character
  messages: Message[]
  lastMessage?: string
  lastMessageAt?: Date
  unreadCount: number
}

export interface Story {
  id: string
  characterId: string
  type: 'text' | 'image'
  content: string
  gradient?: string
  caption?: string
  createdAt: Date
}

export type AuthView = 'login' | 'register'
export type AppPage = 'landing' | 'auth' | 'chat'
