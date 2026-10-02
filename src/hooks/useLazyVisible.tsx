import { useEffect, useRef, useState, type ReactNode } from 'react'

interface UseLazyVisibleOptions {
    rootMargin?: string
    eager?: boolean
}

/**
 * Хук для отложенного рендеринга содержимого.
 * Возвращает реф и флаг видимости.
 */
export const useLazyVisible = ({
    rootMargin = '200px',
    eager = false,
}: UseLazyVisibleOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(eager)

    useEffect(() => {
        if (eager) return
        if (isVisible) return
        if (!ref.current) return

        // Если IntersectionObserver не поддерживается — сразу показываем
        if (typeof IntersectionObserver === 'undefined') {
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin }
        )

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [eager, isVisible, rootMargin])

    return { ref, isVisible }
}

interface LazyVisibleProps {
    children: ReactNode
    fallback?: ReactNode
    rootMargin?: string
    minHeight?: number | string
}

/**
 * Компонент-обёртка для отложенного рендеринга.
 * Показывает fallback, пока содержимое не станет видимым.
 */
export const LazyVisible = ({
    children,
    fallback = null,
    rootMargin = '200px',
    minHeight,
}: LazyVisibleProps) => {
    const { ref, isVisible } = useLazyVisible({ rootMargin })

    return (
        <div ref={ref} style={minHeight ? { minHeight } : undefined}>
            {isVisible ? children : fallback}
        </div>
    )
}