import { memo, type ReactNode } from 'react'

interface AdvantageCardProps {
    title: string
    description: string
    icon: ReactNode
}

export const AdvantageCard = memo(function AdvantageCard({
    title,
    description,
    icon,
}: AdvantageCardProps) {
    return (
        <div className="advantage-card">
            <div className="advantage-icon-wrapper" aria-hidden="true">
                {icon}
            </div>
            <h3 className="advantage-title">{title}</h3>
            <p className="advantage-desc">{description}</p>
        </div>
    )
})