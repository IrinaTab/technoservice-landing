import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Отключаем автоматическое восстановление скролла браузером (F5 и история переходов)
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
}

/**
 * Сбрасывает скролл наверх при смене маршрута.
 * Также обрабатывает плавный скролл для якорных ссылок (href="#...").
 * Не рендерит ничего — это «side-effect» компонент.
 */
export const ScrollToTop = () => {
    const { pathname } = useLocation()

    // Сброс скролла при смене маршрута
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        const resetScroll = () => {
            // Прямое присваивание — мгновенно и игнорирует CSS scroll-behavior
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
        }

        resetScroll()

        // Повторный сброс в следующем кадре анимации для защиты от асинхронного
        // восстановления позиции браузером при F5
        const rafId = requestAnimationFrame(resetScroll)

        return () => cancelAnimationFrame(rafId)
    }, [pathname])

    // Обработка плавного скролла для якорных ссылок через JS
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
            if (!anchor) return

            const href = anchor.getAttribute('href')
            if (!href) return

            // Ссылка наверх страницы <a href="#">
            if (href === '#') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return
            }

            const targetId = href.slice(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                e.preventDefault()
                targetElement.scrollIntoView({ behavior: 'smooth' })
                window.history.pushState(null, '', href)
            }
        }

        document.addEventListener('click', handleAnchorClick)
        return () => {
            document.removeEventListener('click', handleAnchorClick)
        }
    }, [])

    return null
}
