'use client'

import { cn } from '@/lib/utils'
import { LoaderCircleIcon } from 'lucide-react'

export const Loading = ({ className }: { className?: string }) => (
  <div className={cn('w-full flex items-center justify-center', className)}>
    <LoaderCircleIcon className="animate-spin w-5 h-5" />
  </div>
)
