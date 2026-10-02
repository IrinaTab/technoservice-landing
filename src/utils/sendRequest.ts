import { sendTelegramMessage } from './sendTelegramMessage'

interface SendRequestParams {
    name: string
    phone: string
    service?: string
    comment?: string
    captchaToken?: string
}

interface SendRequestResult {
    success: boolean
    channel: 'telegram' | 'web3forms' | 'none'
    error?: string
}

/**
 * Отправляет заявку:
 * 1. Сначала Telegram (основной канал).
 * 2. Если Telegram не сработал — Web3Forms (email).
 */
export const sendRequest = async ({
    name,
    phone,
    service,
    comment,
    captchaToken,
}: SendRequestParams): Promise<SendRequestResult> => {
    // ===== 1. Telegram =====
    try {
        const telegramSuccess = await sendTelegramMessage({
            name,
            phone,
            service,
            comment,
        })
        if (telegramSuccess) {
            return { success: true, channel: 'telegram' }
        }
    } catch (err) {
        console.warn('[sendRequest] Telegram не сработал, пробуем Email:', err)
    }

    // ===== 2. Web3Forms (резерв) =====
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
        console.error('[sendRequest] Не задан VITE_WEB3FORMS_ACCESS_KEY')
        return {
            success: false,
            channel: 'none',
            error: 'Не удалось отправить заявку. Позвоните нам: +7 (949) 712 80 83',
        }
    }

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                access_key: accessKey,
                subject: '🔔 Новая заявка с сайта ОргТехСервис',
                from_name: 'Сайт ОргТехСервис',
                name,
                phone,
                service: service || '—',
                comment: comment || '—',
                'h-captcha-response': captchaToken || '',
            }),
        })

        const data = await response.json()

        if (data.success) {
            return { success: true, channel: 'web3forms' }
        }

        console.error('[sendRequest] Web3Forms ошибка:', data)
        return {
            success: false,
            channel: 'none',
            error: 'Не удалось отправить заявку. Позвоните нам: +7 (949) 712 80 83',
        }
    } catch (err) {
        console.error('[sendRequest] Ошибка сети Web3Forms:', err)
        return {
            success: false,
            channel: 'none',
            error: 'Не удалось отправить заявку. Позвоните нам: +7 (949) 712 80 83',
        }
    }
}