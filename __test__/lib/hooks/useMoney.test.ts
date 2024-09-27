import type { Price } from '@/core/common/domain/entities/price'
import { useMoney } from '@/lib/hooks/useMoney'
import { describe, expect, it } from 'vitest'

const originalNavigator = { ...navigator }

describe('useMoney', () => {
  afterEach(() => {
    global.navigator = originalNavigator
  })

  it('should format money correctly with default locale', () => {
    const price: Price = { amount: 1000, currency: 'USD' }
    const formatted = useMoney(price)
    expect(formatted).toBe('$1,000.00')
  })

  it('should format money correctly with specified locale', () => {
    const price: Price = { amount: 1000, currency: 'EUR' }
    const formatted = useMoney(price, 'de-DE')
    expect(formatted).toBe('1.000,00 €')
  })

  it('should fallback to navigator language when locale is not provided', () => {
    const price: Price = { amount: 1000, currency: 'GBP' }

    Object.defineProperty(global.navigator, 'language', { value: 'fr-FR' })

    const formatted = useMoney(price)
    expect(formatted).toBe('1 000,00 £GB')
  })
})
