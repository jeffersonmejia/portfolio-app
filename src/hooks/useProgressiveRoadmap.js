import { useEffect, useRef } from 'react'

export function useProgressiveRoadmap() {
  const roadmapRef = useRef(null)

  useEffect(() => {
    const roadmap = roadmapRef.current
    if (!roadmap) return undefined
    const entries = [...roadmap.querySelectorAll('.roadmap-entry')]
    roadmap.dataset.progressive = 'true'

    if (!('IntersectionObserver' in window)) {
      entries.forEach((entry) => entry.classList.add('is-revealed'))
      return undefined
    }

    const observer = new IntersectionObserver((observed) => {
      observed.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return
        target.classList.add('is-revealed')
        observer.unobserve(target)
      })
    }, { rootMargin: '180px 0px', threshold: .01 })

    entries.forEach((entry) => observer.observe(entry))
    return () => observer.disconnect()
  }, [])

  return roadmapRef
}
