interface SendTelegramMessageParams {
    name: string
    phone: string
    service?: string
    comment?: string
}

const TELEGRAM_TIMEOUT_MS = 8000

/**
 * Отправляет заявку в Telegram-бот.
 * Возвращает true при успехе, false при ошибке или таймауте.
 */
export const sendTelegramMessage = async ({
    name,
    phone,
    service,
    comment,
}: SendTelegramMessageParams): Promise<boolean> => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    if (!token || !chatId) {
        console.warn(
            '[sendTelegramMessage] Не заданы VITE_TELEGRAM_BOT_TOKEN или VITE_TELEGRAM_CHAT_ID'
        )
        return false
    }

    const text = [
        '🔔 *Новая заявка с сайта*',
        '',
        `👤 *Имя:* ${name || '—'}`,
        `📞 *Телефон:* ${phone || '—'}`,
        `🛠 *Услуга:* ${service || '—'}`,
        `💬 *Комментарий:* ${comment || '—'}`,
        '',
        `🕒 *Время:* ${new Date().toLocaleString('ru-RU')}`,
    ].join('\n')

    // AbortController с таймаутом — если Telegram не ответил за 8 сек, прерываем
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS)

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: 'Markdown',
                }),
                signal: controller.signal,
            }
        )

        const data = await response.json()

        if (!data.ok) {
            console.error('[sendTelegramMessage] Ошибка:', data.description)
            return false
        }

        return true
    } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
            console.warn(
                `[sendTelegramMessage] Таймаут ${TELEGRAM_TIMEOUT_MS}мс — переключаемся на резервный канал`
            )
        } else {
            console.error('[sendTelegramMessage] Ошибка сети:', err)
        }
        return false
    } finally {
        clearTimeout(timeoutId)
    }
}