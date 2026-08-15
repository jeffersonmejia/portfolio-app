import { useEffect, useRef } from 'react'
import { Icon } from './Icon'

export function Modal({ children, className = '', closeOnScroll = false, label, open, onClose, showCloseLabel = false }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open || !closeOnScroll) return undefined
    const initialScroll = window.scrollY
    let touchY = 0
    const closeFromScroll = () => onClose()
    const handleScroll = () => {
      if (window.scrollY > initialScroll + 4) closeFromScroll()
    }
    const handleWheel = (event) => {
      if (event.deltaY > 6) closeFromScroll()
    }
    const handleTouchStart = (event) => { touchY = event.touches[0]?.clientY ?? 0 }
    const handleTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY ?? touchY
      if (touchY - currentY > 10) closeFromScroll()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [closeOnScroll, onClose, open])

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button className={`modal-close icon-button ${showCloseLabel ? 'modal-close-labeled' : ''}`} type="button" onClick={onClose} aria-label="Cerrar">
        <Icon name="x" />
        {showCloseLabel && <span>Cerrar</span>}
      </button>
      {children}
    </dialog>
  )
}
