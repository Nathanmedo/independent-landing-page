import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

export const LoadingButton = ({
    className,
    isLoading,
    isDisabled,
    ...props
}) => {
  return (
    <button
    disabled={isLoading || isDisabled}
    className={cn('flex items-center gap-2', className)}
    {...props}
    >
        {isLoading && <Loader2 className='size-5 animate-spin' />}
        {props.children}
    </button>
  )
}

export default LoadingButton;