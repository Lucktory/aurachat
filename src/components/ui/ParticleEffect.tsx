import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  color: string
}

interface ParticleEffectProps {
  trigger: boolean
  x?: number
  y?: number
  count?: number
}

export default function ParticleEffect({ trigger, x = 0, y = 0, count = 20 }: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animFrame = useRef<number>(0)

  const colors = ['#A855F7', '#EC4899', '#F59E0B', '#38BDF8', '#F97316']

  useEffect(() => {
    if (!trigger) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    particles.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 8 + 2
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 1,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current = particles.current.filter((p) => p.life > 0)

      particles.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.2
        p.life -= 0.025
        p.vx *= 0.98

        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      if (particles.current.length > 0) {
        animFrame.current = requestAnimationFrame(animate)
      }
    }

    animFrame.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame.current)
  }, [trigger, x, y])

  if (!trigger) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  )
}
