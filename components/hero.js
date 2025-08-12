'use client'

import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [floatingElements, setFloatingElements] = useState([])

  useEffect(() => {
    // Generate floating elements only on client
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 2
    }))
    setFloatingElements(elements)
  }, [])

  return (
    <section className="relative m...">
      <div>
        <div className="absolute i...">
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="absolute w-1 h-1 bg-primary/10 rounded-full animate-float"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>
        {/* Rest of your hero content */}
      </div>
    </section>
  )
}