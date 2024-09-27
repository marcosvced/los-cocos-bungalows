import AButton from '@/lib/ui/atoms/a-button.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('a-button.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(AButton)
    expect(wrapper.find('button').classes()).toContain('primary-btn')
    expect(wrapper.text()).toBe('')
  })

  it('renders correctly with secondary variant', () => {
    const wrapper = mount(AButton, {
      props: {
        variant: 'secondary',
      },
    })
    expect(wrapper.find('button').classes()).toContain('secondary-btn')
  })

  it('renders the slot content', () => {
    const wrapper = mount(AButton, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.find('button').text()).toBe('Click Me')
  })
})
