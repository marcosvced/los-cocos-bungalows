import type { Price } from '@/core/common/domain/entities/price'
import { useMoney } from '@/lib/hooks/useMoney'
import { describe, expect, it } from 'vitest'
import { PriceFactory } from '../../core/common/PriceFactory'

const originalNavigator = { ...navigator }

describe('useMoney', () => {
  afterEach(() => {
    globalThis.navigator = originalNavigator
  })

  it('should format money correctly with default locale', () => {
    const price: Price = PriceFactory.new().create({ amount: 1000, currency: 'USD' })
    const formatted = useMoney(price)
    expect(formatted).toBe('$1,000.00')
  })

  it('should format money correctly with specified locale', () => {
    const price: Price = PriceFactory.new().create({ amount: 1000 })
    const formatted = useMoney(price, 'de-DE')
    expect(formatted).toBe('1.000,00 €')
  })

  it('should fallback to navigator language when locale is not provided', () => {
    const price: Price = { amount: 1000, currency: 'GBP' }

    Object.defineProperty(globalThis.navigator, 'language', { value: 'fr-FR' })

    const formatted = useMoney(price)
    expect(formatted).toBe('1 000,00 £GB')
  })
})
