import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sendRequest } from './sendRequest'

describe('sendRequest', () => {
    const originalFetch = globalThis.fetch

    beforeEach(() => {
        vi.restoreAllMocks()
    })

    afterEach(() => {
        globalThis.fetch = originalFetch
    })

    it('возвращает success: true при успешном ответе', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            json: async () => ({ success: true }),
        }) as unknown as typeof fetch

        const result = await sendRequest({
            name: 'Иван',
            phone: '+7 (949) 712-80-83',
            service: 'Заправка картриджей',
        })

        expect(result.success).toBe(true)
        expect(globalThis.fetch).toHaveBeenCalledWith(
            '/api/send-telegram',
            expect.objectContaining({ method: 'POST' })
        )
    })

    it('возвращает success: false при ответе success: false', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            json: async () => ({ success: false }),
        }) as unknown as typeof fetch

        const result = await sendRequest({
            name: 'Иван',
            phone: '+7 (949) 712-80-83',
        })

        expect(result.success).toBe(false)
        expect(result.error).toContain('Не удалось отправить заявку')
    })

    it('возвращает success: false при сетевой ошибке', async () => {
        globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error')) as unknown as typeof fetch

        const result = await sendRequest({
            name: 'Иван',
            phone: '+7 (949) 712-80-83',
        })

        expect(result.success).toBe(false)
        expect(result.error).toContain('Не удалось отправить заявку')
    })

    it('возвращает сообщение о таймауте при AbortError', async () => {
        globalThis.fetch = vi.fn().mockImplementation(() => {
            const err = new DOMException('Aborted', 'AbortError')
            return Promise.reject(err)
        }) as unknown as typeof fetch

        const result = await sendRequest({
            name: 'Иван',
            phone: '+7 (949) 712-80-83',
        })

        expect(result.success).toBe(false)
        expect(result.error).toContain('Сервер не отвечает')
    })
})