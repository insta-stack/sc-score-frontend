import React from 'react'
import { cn } from '../../lib/utils'

export const Label = React.forwardRef(({ className, children, required, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn('block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1', className)}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  )
})

Label.displayName = 'Label'
