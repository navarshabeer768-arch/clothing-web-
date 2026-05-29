'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'
interface Toast { id: string; message: string; type: ToastType }

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  if (!mounted) return null

  const icons = {
    success: <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />,
    info: <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />,
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            className={cn('pointer-events-auto flex items-center gap-3 px-4 py-3.5 bg-white border shadow-luxury rounded-sm max-w-sm',
              t.type === 'success' && 'border-green-200',
              t.type === 'error' && 'border-red-200',
              t.type === 'info' && 'border-blue-200')}>
            {icons[t.type]}
            <p className="text-sm flex-1">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="p-0.5 hover:bg-luxury-50 rounded-sm">
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
