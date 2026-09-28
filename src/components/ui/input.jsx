import React from 'react'
import { cn } from '../../lib/utils'

export const Input = React.forwardRef(({ className, type = 'text', error, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/20 transition focus:border-violet-300 focus:bg-black/30 focus:outline-none focus:ring-2 focus:ring-violet-300/20 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
