interface SendRequestParams {
    name: string
    phone: string
    service?: string
    comment?: string
    website?: string // honeypot
}

interface SendRequestResult {
    success: boolean
    error?: string
}

const TIMEOUT_MS = 10000

export const sendRequest = async ({
    name,
    phone,
    service,
    comment,
    website,
}: SendRequestParams): Promise<SendRequestResult> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
        // Стучимся на наш собственный Vercel API
        const response = await fetch('/api/send-telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, service, comment, website }),
            signal: controller.signal,
        })

        const data = await response.json()

        if (data.success) {
            return { success: true }
        }

        return {
            success: false,
            error: 'Не удалось отправить заявку. Позвоните нам: +7 (949) 712 80 83',
        }
    } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
            return {
                success: false,
                error: 'Сервер не отвечает. Позвоните нам: +7 (949) 712 80 83',
            }
        }
        return {
            success: false,
            error: 'Не удалось отправить заявку. Позвоните нам: +7 (949) 712 80 83',
        }
    } finally {
        clearTimeout(timeoutId)
    }
}