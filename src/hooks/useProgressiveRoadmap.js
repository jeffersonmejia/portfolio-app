import { useEffect, useRef } from 'react'

export function useProgressiveRoadmap({ initialCount = 0, revealBatch = false, rootMargin = '180px 0px' } = {}) {
  const roadmapRef = useRef(null)

  useEffect(() => {
    const roadmap = roadmapRef.current
    if (!roadmap) return undefined
    const entries = [...roadmap.querySelectorAll('.roadmap-entry')]
    const deferredEntries = entries.slice(initialCount)
    roadmap.dataset.progressive = 'true'
    entries.slice(0, initialCount).forEach((entry) => entry.classList.add('is-revealed'))

    if (!('IntersectionObserver' in window)) {
      entries.forEach((entry) => entry.classList.add('is-revealed'))
      return undefined
    }

    const observer = new IntersectionObserver((observed) => {
      observed.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return
        const entriesToReveal = revealBatch ? deferredEntries : [target]
        entriesToReveal.forEach((entry) => {
          entry.classList.add('is-revealed')
          observer.unobserve(entry)
        })
      })
    }, { rootMargin, threshold: .01 })

    deferredEntries.forEach((entry) => observer.observe(entry))
    return () => observer.disconnect()
  }, [initialCount, revealBatch, rootMargin])

  return roadmapRef
}
