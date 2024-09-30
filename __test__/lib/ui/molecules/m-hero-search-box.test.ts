import type { DateTime } from 'luxon'
import { useDate } from '@/lib/hooks/useDate'
import MHeroSearchBox from '@/lib/ui/molecules/heroSearchBox/m-hero-search-box.vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

describe('m-hero-search-box', () => {
  let defaults: {
    arrivalDate: DateTime
    departureDate: DateTime
    adults: number
    children: number
  } = {}

  beforeEach(() => {
    const arrivalDate = useDate('today')
    defaults = {
      arrivalDate,
      departureDate: useDate(arrivalDate.toJSDate(), { plus: 3 }),
      adults: 2,
      children: 1,
    }
  })

  it('should render the component correctly', () => {
    const wrapper = mount(MHeroSearchBox, { props: { defaults } })

    expect(wrapper.findComponent({ name: 'ADatepicker' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ASelect' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AButton' }).exists()).toBe(true)
  })

  it('should emit onChange when the Modify button is clicked', async () => {
    const wrapper = mount(MHeroSearchBox, {
      props: { defaults },
    })

    const button = wrapper.findComponent({ name: 'AButton' })
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('onChange')
    const emittedData = wrapper.emitted('onChange')[0][0]
    expect(emittedData).toEqual(defaults)
  })

  it('should update v-model data when values change', async () => {
    const wrapper = mount(MHeroSearchBox, {
      props: {
        defaults,
      },
    })

    const arrivalDatepicker = wrapper.findComponent({ name: 'ADatepicker' }).vm
    const adultsSelect = wrapper.findComponent({ name: 'ASelect' }).vm

    // Simulate changing the value of arrivalDate
    arrivalDatepicker.$emit('update:date', defaults.arrivalDate)
    await wrapper.vm.$nextTick()

    // Check if the value has updated
    expect(wrapper.vm.arrivalDate).toEqual(defaults.arrivalDate)

    // Simulate changing the value of adults
    adultsSelect.$emit('update:value', 3)
    await wrapper.vm.$nextTick()

    // Check if the value has updated
    expect(wrapper.vm.adults).toBe(3)
  })
})
