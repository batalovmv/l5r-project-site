import type { ReactNode } from 'react'

type NoticeVariant = 'info' | 'success' | 'warn'

const VARIANT = {
  info: {
    icon: 'fa-circle-info',
    iconBg: 'bg-l5r-gold/10 border-l5r-gold/25',
    iconText: 'text-l5r-gold',
  },
  success: {
    icon: 'fa-circle-check',
    iconBg: 'bg-success/10 border-success/25',
    iconText: 'text-success',
  },
  warn: {
    icon: 'fa-triangle-exclamation',
    iconBg: 'bg-l5r-red/5 border-l5r-red/20',
    iconText: 'text-l5r-red',
  },
} as const satisfies Record<NoticeVariant, { icon: string; iconBg: string; iconText: string }>

export default function Notice({
  variant = 'info',
  title,
  icon,
  children,
  actions,
  className,
  compact,
}: {
  variant?: NoticeVariant
  title?: ReactNode
  icon?: string
  children: ReactNode
  actions?: ReactNode
  className?: string
  compact?: boolean
}) {
  const v = VARIANT[variant]
  const iconName = icon ?? v.icon

  return (
    <div className={`card-soft ${compact ? 'p-4' : 'p-6'} ${className ?? ''}`}>
      <div className={`flex items-start gap-4 ${compact ? 'gap-3' : 'gap-4'}`}>
        <div className={`w-11 h-11 rounded-xl ${v.iconBg} border flex items-center justify-center flex-shrink-0`}>
          <i className={`fa-solid ${iconName} ${v.iconText}`}></i>
        </div>
        <div className="min-w-0 flex-1">
          {title ? <div className="font-header font-bold text-lg text-ink mb-1">{title}</div> : null}
          <div className="text-sm text-ink-light leading-relaxed">{children}</div>
          {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      </div>
    </div>
  )
}

