// Vercel автоматически превратит этот файл в серверный эндпоинт /api/send-telegram

export const config = {
    runtime: 'edge', // Используем Edge Runtime для минимальной задержки
}

export default async function handler(request: Request) {
    // Разрешаем только POST запросы
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
    }

    try {
        const body = await request.json()

        // Формируем сообщение для Telegram
        const text = [
            '🔔 *Новая заявка с сайта*',
            '',
            `👤 *Имя:* ${body.name || '—'}`,
            `📞 *Телефон:* ${body.phone || '—'}`,
            `🛠 *Услуга:* ${body.service || '—'}`,
            `💬 *Комментарий:* ${body.comment || '—'}`,
            '',
            `🕒 *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
        ].join('\n')

        // Отправляем в Telegram. Токены берем из переменных окружения Vercel
        const response = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown',
                }),
            }
        )

        const data = await response.json()

        if (!data.ok) {
            return new Response(JSON.stringify({ success: false, error: data.description }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}