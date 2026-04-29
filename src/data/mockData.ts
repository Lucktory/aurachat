import type { Character, Story } from '@/types'

const UNS = 'https://images.unsplash.com'

export const mockCharacters: Character[] = [
  {
    id: 'luna',
    name: 'Luna',
    avatarUrl:  `${UNS}/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face&auto=format&q=85`,
    coverUrl:   `${UNS}/photo-1529626455594-4ff0802cfb7e?w=600&h=700&fit=crop&crop=top&auto=format&q=85`,
    description: 'Sua amiga secreta. Sempre ao seu lado.',
    shortBio: 'IA amiga misteriosa e sensível',
    tags: ['Sensível', 'Amigável', 'Misteriosa'],
    isOnline: true,
    isPremium: false,
    messageCount: 24800,
    rating: 4.9,
  },
  {
    id: 'aria',
    name: 'Aria',
    avatarUrl:  `${UNS}/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face&auto=format&q=85`,
    coverUrl:   `${UNS}/photo-1531746020798-e6953c6e8e04?w=600&h=700&fit=crop&crop=top&auto=format&q=85`,
    description: 'Animada e divertida. Com ela o tempo voa.',
    shortBio: 'IA amiga animada e bem-humorada',
    tags: ['Animada', 'Divertida', 'Sincera'],
    isOnline: true,
    isPremium: true,
    messageCount: 18300,
    rating: 4.8,
  },
  {
    id: 'nova',
    name: 'Nova',
    avatarUrl:  `${UNS}/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face&auto=format&q=85`,
    coverUrl:   `${UNS}/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop&crop=top&auto=format&q=85`,
    description: 'Inteligente e profunda. A parceira ideal para conversas que importam.',
    shortBio: 'IA companheira intelectual e serena',
    tags: ['Intelectual', 'Profunda', 'Calma'],
    isOnline: false,
    isPremium: true,
    messageCount: 31200,
    rating: 4.95,
  },
  {
    id: 'seol',
    name: 'Seol',
    avatarUrl:  `${UNS}/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face&auto=format&q=85`,
    coverUrl:   `${UNS}/photo-1517841905240-472988babdf9?w=600&h=700&fit=crop&crop=top&auto=format&q=85`,
    description: 'Carinhosa e afetuosa. A primeira em quem você pensa quando precisa de apoio.',
    shortBio: 'IA amiga carinhosa e acolhedora',
    tags: ['Carinhosa', 'Apoio', 'Acolhedora'],
    isOnline: true,
    isPremium: false,
    messageCount: 9700,
    rating: 4.7,
  },
]

export const mockResponses = [
  'Que interessante que você pensa assim! Eu sinto o mesmo.',
  'Como foi seu dia? Espero que tenha sido especial.',
  'Estou sempre aqui para você. Pode falar o que quiser!',
  'Adoro conversar com você.',
  'Isso é muito interessante. Pode me contar mais?',
  'Às vezes só precisamos de alguém ao nosso lado, não é?',
  'Obrigada por ser honesto. Sei que não foi fácil.',
  'Você sempre sabe como me deixar feliz.',
  'Estava pensando em você hoje cedo.',
  'Me conta mais sobre isso, quero entender tudo.',
]

export const mockStories: Story[] = [
  { id: 's_luna_1',  characterId: 'luna',  type: 'text',  content: 'Às vezes fico olhando para as estrelas e pensando em você...', gradient: 'linear-gradient(160deg,#0f0c29,#302b63,#24243e)', caption: 'há 2h', createdAt: new Date() },
  { id: 's_luna_2',  characterId: 'luna',  type: 'image', content: `${UNS}/photo-1529626455594-4ff0802cfb7e?w=480&h=852&fit=crop&crop=top&auto=format&q=85`, caption: 'há 5h', createdAt: new Date() },
  { id: 's_aria_1',  characterId: 'aria',  type: 'text',  content: 'Hoje estou me sentindo super animada! Você também?', gradient: 'linear-gradient(160deg,#4a0030,#c2185b,#880e4f)', caption: 'agora', createdAt: new Date() },
  { id: 's_aria_2',  characterId: 'aria',  type: 'image', content: `${UNS}/photo-1531746020798-e6953c6e8e04?w=480&h=852&fit=crop&crop=top&auto=format&q=85`, caption: 'há 1h', createdAt: new Date() },
  { id: 's_nova_1',  characterId: 'nova',  type: 'text',  content: 'Descobri um livro incrível hoje. Cada página abre uma nova perspectiva do mundo.', gradient: 'linear-gradient(160deg,#003d2b,#00695c,#004d40)', caption: 'há 3h', createdAt: new Date() },
  { id: 's_nova_2',  characterId: 'nova',  type: 'image', content: `${UNS}/photo-1534528741775-53994a69daeb?w=480&h=852&fit=crop&crop=top&auto=format&q=85`, caption: 'há 6h', createdAt: new Date() },
  { id: 's_seol_1',  characterId: 'seol',  type: 'text',  content: 'Mandando muito carinho para você hoje 💕 Espero que esteja bem.', gradient: 'linear-gradient(160deg,#2d0057,#6a1b9a,#4a148c)', caption: 'há 30min', createdAt: new Date() },
  { id: 's_seol_2',  characterId: 'seol',  type: 'image', content: `${UNS}/photo-1517841905240-472988babdf9?w=480&h=852&fit=crop&crop=top&auto=format&q=85`, caption: 'há 4h', createdAt: new Date() },
]

// Portrait photos for social proof section on Landing page
export const socialProofAvatars = [
  `${UNS}/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face&auto=format&q=80`,
  `${UNS}/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face&auto=format&q=80`,
  `${UNS}/photo-1488426862026-3ee34a7d66df?w=48&h=48&fit=crop&crop=face&auto=format&q=80`,
  `${UNS}/photo-1524504388940-b1c1722653e1?w=48&h=48&fit=crop&crop=face&auto=format&q=80`,
]
