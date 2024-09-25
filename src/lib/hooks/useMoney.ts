import type { Price } from '@/core/common/domain/entities/price'

export function useMoney(price: Price, locale?: string) {
  return new Intl.NumberFormat(locale ?? navigator.language, {
    style: 'currency',
    currency: price.currency,
    currencyDisplay: 'symbol',
  }).format(price.amount)
}
