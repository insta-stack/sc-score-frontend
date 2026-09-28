import React from 'react'
import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('tech-surface rounded-xl', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6 sm:p-8 pb-4 sm:pb-6', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('font-display text-2xl font-semibold tracking-tight text-slate-50', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('mt-1 text-sm text-slate-400', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6 sm:p-8 pt-0 sm:pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('mt-4 flex items-center border-t border-white/10 p-6 pt-0 sm:p-8 sm:pt-0', className)} {...props} />
}
