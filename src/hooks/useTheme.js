import { useEffect, useState } from 'react'

const storageKey = 'portfolio-theme'
const preferredTheme = () => {
  if (typeof document === 'undefined') return false
  return document.documentElement.dataset.theme === 'dark'
}

export function useTheme() {
  const [dark, setDark] = useState(preferredTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    document.body.classList.add('theme-ready')
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      dark ? '#111113' : '#ffffff',
    )
  }, [dark])

  const toggle = (event) => {
    const update = () => {
      setDark((current) => {
        localStorage.setItem(storageKey, current ? 'light' : 'dark')
        return !current
      })
    }

    if (!document.startViewTransition) return update()
    const { clientX: x, clientY: y } = event
    document.documentElement.style.setProperty('--theme-x', `${x}px`)
    document.documentElement.style.setProperty('--theme-y', `${y}px`)
    document.documentElement.classList.add('theme-transition')
    document.startViewTransition(update).finished.finally(() => {
      document.documentElement.classList.remove('theme-transition')
    })
  }

  return { dark, toggle }
}
