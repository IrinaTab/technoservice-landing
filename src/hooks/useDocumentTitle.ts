import { useEffect } from 'react'

/**
 * Устанавливает document.title при монтировании компонента.
 * Восстанавливает прежний title при размонтировании.
 */
export const useDocumentTitle = (title: string) => {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        return () => {
            document.title = prevTitle
        }
    }, [title])
}