import { describe, it, expect } from 'vitest'
import { formatPhone } from './formatPhone'

describe('formatPhone', () => {
    it('форматирует полный номер с +7', () => {
        expect(formatPhone('+79497128083')).toBe('+7 (949) 712-80-83')
    })

    it('форматирует номер, начинающийся с 8', () => {
        expect(formatPhone('89497128083')).toBe('+7 (949) 712-80-83')
    })

    it('форматирует номер без ведущей 7/8', () => {
        expect(formatPhone('9497128083')).toBe('+7 (949) 712-80-83')
    })

    it('обрезает номер до 11 цифр', () => {
        expect(formatPhone('+7949712808312345')).toBe('+7 (949) 712-80-83')
    })

    it('игнорирует нецифровые символы', () => {
        expect(formatPhone('+7 (949) 712-80-83')).toBe('+7 (949) 712-80-83')
        expect(formatPhone('abc949def712ghi8083')).toBe('+7 (949) 712-80-83')
    })

    it('возвращает частичную маску для неполного номера', () => {
        expect(formatPhone('9')).toBe('+7 (9')
        expect(formatPhone('949')).toBe('+7 (949')
        expect(formatPhone('9497')).toBe('+7 (949) 7')
    })

    it('возвращает пустую строку для пустого ввода', () => {
        expect(formatPhone('')).toBe('+7')
    })
})