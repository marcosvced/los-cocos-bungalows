import type { Booking } from '../../../../src/features/booking/domain/entities/Booking'
import { beforeEach, describe, vi } from 'vitest'
import { BookingData } from '../../../../src/features/booking/data/adapters/BookingData'
import { GetBookingQuery } from '../../../../src/features/booking/domain/queries/GetBookingQuery'
import { GetBookingAction } from '../../../../src/features/booking/presentation/bloc/actions/GetBookingAction'
import { BookingBloc } from '../../../../src/features/booking/presentation/bloc/BookingBloc'
import { BookingMother } from '../BookingMother'

describe('bookingBloc', () => {
  let bloc: BookingBloc
  let bookingData: BookingData
  let mockedData: Booking

  beforeEach(() => {
    mockedData = BookingMother.new().valid()
    bookingData = new BookingData()
    vi.spyOn(bookingData, 'get').mockResolvedValue(mockedData)

    bloc = new BookingBloc()

    vi.spyOn(GetBookingAction.prototype, 'execute').mockImplementation(async () => {
      const query = new GetBookingQuery(bookingData)
      return await query.execute()
    })
  })

  it('should update state when GetBookingAction is dispatched', async () => {
    await bloc.dispatch(new GetBookingAction())

    expect(bloc.state.data).toBeDefined()
    expect(bloc.state.data.room).toEqual(mockedData.room)
    expect(bloc.state.data.pax).toEqual(mockedData.pax)
    expect(bloc.state.data.dates).toEqual(mockedData.dates)
  })
})
