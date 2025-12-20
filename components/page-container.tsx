import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: ReactNode
  title?: string
  description?: string
  actions?: ReactNode
  className?: string
  contentClassName?: string
}

export function PageContainer({
  children,
  title,
  description,
  actions,
  className,
  contentClassName,
}: PageContainerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      )}
      <div className={cn("", contentClassName)}>{children}</div>
    </div>
  )
}
