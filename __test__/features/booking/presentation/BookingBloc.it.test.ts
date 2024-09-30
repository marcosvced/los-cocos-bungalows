import type { Booking } from '@/features/booking/domain/entities/Booking'
import { BookingData } from '@/features/booking/data/adapters/BookingData'
import { GetBookingQuery } from '@/features/booking/domain/queries/GetBookingQuery'
import { GetBookingAction } from '@/features/booking/presentation/bloc/actions/GetBookingAction'
import { BookingBloc } from '@/features/booking/presentation/bloc/BookingBloc'
import { beforeEach, describe, vi } from 'vitest'
import { BookingMother } from '../BookingMother'

describe('given a BookingBloc', () => {
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
