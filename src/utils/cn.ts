/**
 * Объединяет CSS-классы, отфильтровывая falsy-значения.
 * Аналог библиотеки classnames / clsx, но без внешних зависимостей.
 *
 * Использование:
 *   cn('btn', isActive && 'btn-active', 'btn-primary') // → "btn btn-active btn-primary"
 *   cn('btn', undefined, null, false)                  // → "btn"
 */
export const cn = (...classes: (string | undefined | null | false)[]): string =>
    classes.filter(Boolean).join(' ')