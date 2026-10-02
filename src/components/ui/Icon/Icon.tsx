import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    /** Содержимое SVG (path, circle, rect, ...) */
    children: ReactNode
    /** Размер иконки в px (по умолчанию 24) */
    size?: number | string
    /** Ширина (если отличается от size) */
    width?: number | string
    /** Высота (если отличается от size) */
    height?: number | string
}

/**
 * Базовая обёртка для SVG-иконок.
 * По умолчанию: 24×24, stroke=currentColor, без заливки,
 * круглые концы линий — это стиль большинства иконок проекта.
 *
 * Все кастомные иконки создаются на его основе.
 */
export const Icon = ({
    children,
    size = 24,
    width,
    height,
    className = '',
    viewBox = '0 0 24 24',
    'aria-hidden': ariaHidden = true,
    ...props
}: IconProps) => {
    return (
        <svg
            className={className}
            width={width ?? size}
            height={height ?? size}
            viewBox={viewBox}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden={ariaHidden}
            {...props}
        >
            {children}
        </svg>
    )
}