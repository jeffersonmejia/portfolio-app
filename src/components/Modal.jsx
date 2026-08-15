import { useEffect, useRef } from 'react'

export function Modal({ children, className = '', label, open, onClose }) {
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
      className={`modal ${className}`.trim()}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button className="modal-close modal-cancel" type="button" onClick={onClose}>Cancelar</button>
      {children}
    </dialog>
  )
}
