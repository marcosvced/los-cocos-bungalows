import type { BLoC, Observer } from '@/core/common/presentation/bloc/BLoC'
import type { Ref } from 'vue'
import { onMounted, onUnmounted, readonly, ref } from 'vue'

export function useBLoC<S>(bloc: BLoC<any, any>) {
  const state = ref(bloc.state) as Ref<S>

  const stateSubscription: Observer<S> = (newState: S) => {
    state.value = newState
  }

  onMounted(() => {
    bloc.subscribe(stateSubscription)
  })

  onUnmounted(() => {
    bloc.unsubscribe(stateSubscription)
  })

  console.log(state.value)
  return readonly(state)
}
