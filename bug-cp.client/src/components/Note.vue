<template>
  <div>
    <p>
      <b>{{ state.note.creator.name }}</b>
      {{ state.note.description }}
    </p>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: { note: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      note: AppState.notes
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
