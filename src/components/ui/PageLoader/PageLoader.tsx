import './PageLoader.css'

/**
 * Loader для Suspense — показывается при загрузке lazy-страниц.
 * Минималистичный: спиннер по центру экрана.
 */
export const PageLoader = () => {
    return (
        <div className="page-loader" role="status" aria-label="Загрузка">
            <div className="page-loader__spinner" />
        </div>
    )
}
