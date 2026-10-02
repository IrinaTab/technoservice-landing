import { memo } from 'react'
import './SectionHeader.css'

interface SectionHeaderProps {
    tag: string
    title: string
    subtitle?: string
}

export const SectionHeader = memo(function SectionHeader({
    tag,
    title,
    subtitle,
}: SectionHeaderProps) {
    return (
        <div className="section-header">
            <span className="section-tag">{tag}</span>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
    )
})