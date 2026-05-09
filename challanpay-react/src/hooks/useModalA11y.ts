import { useEffect, useRef } from 'react'

// Escape closes the modal; body scroll locks while open; focus restores to the
// element that opened the modal once it closes. Pair on every modal.
export function useModalA11y(isOpen: boolean, onClose: () => void) {
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    // Remember whatever was focused at open time so we can return focus on close.
    triggerRef.current = (document.activeElement as HTMLElement | null) ?? null

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = original
      // Defer one frame so the unmounting modal doesn't steal focus first.
      const trigger = triggerRef.current
      if (trigger && typeof trigger.focus === 'function') {
        requestAnimationFrame(() => trigger.focus())
      }
    }
  }, [isOpen, onClose])
}
