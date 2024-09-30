import type { Price } from '../../../src/core/common/domain/entities/price'
import { Factory } from '../../common/Factory'

export class PriceFactory extends Factory<Price> {
  protected fake(): Price {
    return {
      amount: this.faker.number.float(),
      currency: 'EUR',
    }
  }
}
