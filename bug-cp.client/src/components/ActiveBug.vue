<template>
  <div class="card open" v-if="state.bug.status === false">
    <div class="card-header">
      <h3>{{ state.bug.title }}</h3>
      <p v-if="state.bug.status === false" class="red">
        Open
      </p>
      <p>Created by: {{ state.bug.creator.name }}</p>
    </div>
    <div class="card-body">
      <p>{{ state.bug.description }}</p>
    </div>
    <div class="card-footer">
      comments go here
    </div>
  </div>
  <div class="card open" v-if="state.bug.status === true">
    <div class="card-header">
      <h3>{{ state.bug.title }}</h3>
      <p v-if="state.bug.status === true" class="green">
        Closed
      </p>
      <p>Created by: {{ state.bug.creator.name }}</p>
    </div>
    <div class="card-body">
      <p>{{ state.bug.description }}</p>
    </div>
    <div class="card-footer">
      <Note v-for="note in notes" :key="note" :note="note" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default {
  setup() {
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes.filter(n => state.b.id === n.bug))
    })
    onMounted(() => {
      notesService.getNotes()
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
.green{
  color: rgb(7, 136, 7);
  font-weight: bold;
}
.open{
  outline: solid 2px rgba(194, 4, 4, 0.637);
}
.red{
  color: rgb(167, 18, 18);
  font-weight: bold;
}
</style>
