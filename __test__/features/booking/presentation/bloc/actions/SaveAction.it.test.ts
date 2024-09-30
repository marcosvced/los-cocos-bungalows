import { EmptyException } from '@/core/common/domain/exceptions/GenericException'
import { BookingData } from '@/features/booking/data/adapters/BookingData'
import { SaveAction } from '@/features/booking/presentation/bloc/actions/SaveAction'
import { beforeEach } from 'vitest'
import { BookingMother } from '../../../BookingMother'

describe('save action', () => {
  let action: SaveAction
  beforeEach(() => {
    localStorage.clear()
    action = new SaveAction()
  })

  it('should save booking data successfully', async () => {
    const booking = BookingMother.new().valid()
    await action.execute(booking)
    await expect(action.execute(booking)).resolves.not.toThrow()

    expect(localStorage.getItem(BookingData.storageKey)).not.toBeNull()
  })

  it('should throw an error if no data is provided', async () => {
    await expect(action.execute()).rejects.toThrow(EmptyException)
    expect(localStorage.getItem(BookingData.storageKey)).toBeNull()
  })
})
