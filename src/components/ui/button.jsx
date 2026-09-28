import React from 'react'
import { cn } from '../../lib/utils'
import SpecularButton from '../shared/SpecularButton'

export const Button = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      disabled = false,
      loading = false,
      type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    // We map our existing variants to tint, baseColor, etc. to make it fit the SpecularButton logic
    let tint = '#ffffff'
    let tintOpacity = 0.1
    let textColor = '#f5f5f5'
    let lineColor = '#ffffff'
    let baseColor = '#525252'
    let specularSize = 'md'

    if (size === 'sm') specularSize = 'sm'
    if (size === 'lg') specularSize = 'lg'

    if (variant === 'default') {
      tint = '#6001d1' // Violet
      tintOpacity = 0.2
      lineColor = '#d2bbff'
    } else if (variant === 'destructive') {
      tint = '#ef4444' // Red
      tintOpacity = 0.2
      lineColor = '#fca5a5'
    } else if (variant === 'ghost') {
      tintOpacity = 0
      baseColor = '#333333'
    }

    return (
      <SpecularButton
        type={type}
        size={specularSize}
        disabled={disabled || loading}
        className={className}
        tint={tint}
        tintOpacity={tintOpacity}
        textColor={textColor}
        lineColor={lineColor}
        baseColor={baseColor}
        radius={18}
        onClick={props.onClick}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin inline-block text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </SpecularButton>
    )
  }
)

Button.displayName = 'Button'
