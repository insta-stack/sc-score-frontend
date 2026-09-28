import { useEffect, useState } from 'react'

const TOAST_TIMEOUT = 4000
let toastId = 0
let toasts = []
const listeners = new Set()

function emit() {
  listeners.forEach((listener) => listener(toasts))
}

function dismiss(id) {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

export function toast({ title, description, variant = 'default' }) {
  const id = ++toastId
  toasts = [...toasts, { id, title, description, variant }]
  emit()
  setTimeout(() => dismiss(id), TOAST_TIMEOUT)
  return id
}

export function useToast() {
  const [state, setState] = useState(toasts)

  useEffect(() => {
    listeners.add(setState)
    return () => listeners.delete(setState)
  }, [])

  return { toasts: state, toast, dismiss }
}
