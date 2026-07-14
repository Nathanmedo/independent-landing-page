import React from 'react'
import { cn } from '@/lib/utils';

const Badge = ({children, className}) => {
  return (
    <div className={cn('bg-primary text-secondary px-2 py-1 text-sm', className)}>
      {children}
    </div>
  )
}

export default Badge;
