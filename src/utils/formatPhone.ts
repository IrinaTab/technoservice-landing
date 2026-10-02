/**
 * Форматирует ввод телефона по маске +7 (XXX) XXX-XX-XX.
 * Возвращает отформатированную строку.
 *
 * Пример:
 *   formatPhone('79497128083')    // → "+7 (949) 712-80-83"
 *   formatPhone('+79497128083')   // → "+7 (949) 712-80-83"
 *   formatPhone('9497128083')     // → "+7 (949) 712-80-83"
 */
export const formatPhone = (value: string): string => {
    // Оставляем только цифры
    const digits = value.replace(/\D/g, '')

    // Приводим к 11 цифрам с ведущей 7
    let normalized = digits
    if (normalized.startsWith('8')) normalized = '7' + normalized.slice(1)
    if (!normalized.startsWith('7')) normalized = '7' + normalized
    normalized = normalized.slice(0, 11)

    // Постепенно формируем маску
    const parts = [
        '+7',
        normalized.slice(1, 4) ? ` (${normalized.slice(1, 4)}` : '',
        normalized.slice(4, 7) ? `) ${normalized.slice(4, 7)}` : '',
        normalized.slice(7, 9) ? `-${normalized.slice(7, 9)}` : '',
        normalized.slice(9, 11) ? `-${normalized.slice(9, 11)}` : '',
    ]

    return parts.join('')
}