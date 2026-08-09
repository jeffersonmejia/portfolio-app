import { useEffect, useRef } from 'react'
import { Icon } from './Icon'

export function Modal({ children, label, open, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button className="modal-close icon-button" type="button" onClick={onClose} aria-label="Cerrar">
        <Icon name="x" />
      </button>
      {children}
    </dialog>
  )
}
