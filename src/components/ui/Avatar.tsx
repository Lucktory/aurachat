interface AvatarProps {
  src: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isOnline?: boolean
  className?: string
}

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-xl',
  xl: 'w-20 h-20 text-2xl',
}

export default function Avatar({ src, name, size = 'md', isOnline, className = '' }: AvatarProps) {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className={`${sizes[size]} rounded-full overflow-hidden bg-bg-overlay ring-2 ring-white/10`}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-primary text-white font-bold">
            {name[0]}
          </div>
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bg-surface ${
            isOnline ? 'bg-green-400' : 'bg-brand-muted'
          }`}
        />
      )}
    </div>
  )
}
